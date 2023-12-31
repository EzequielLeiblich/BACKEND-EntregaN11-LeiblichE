import passport from 'passport';
import local from 'passport-local';
import { createHash, isValidPassword } from '../mocks/bcrypt.utils.js';
import config from "../config.js";

import SessionController from '../controllers/sessionController.js'
import CartController from '../controllers/cartController.js';

const localStrategy = local.Strategy;

let sessionController = new SessionController();
const cartController = new CartController();

export const initializePassportLocal = (req, res, next) => {
    // Primera estrategia - Registro:
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
    async (req, username, password, done) => {
        const {
            first_name,
            last_name,
            age,
            email
        } = req.body;
        try {
            const existSessionControl = await sessionController.getUserByEmailOrNameOrIdController(req, res, username);
            if (existSessionControl.statusCode === 500) {
                return done(null, false, {
                    message: existSessionControl.message
                });
            }
            else if (existSessionControl.statusCode === 200) {
                return done(null, false, {
                    message: 'El usuario ya existe. Presione "Ingresa aquí" para iniciar sesión.'
                });
            }
            else if (existSessionControl.statusCode === 404) {
                const resultCartControl = await cartController.createCartController(req, res);
                if (resultCartControl.statusCode === 500) {
                    return done(null, false, {
                        message: resultCartControl.message
                    });
                }
                else if (resultCartControl.statusCode === 200) {
                    const cart = resultCartControl.result;
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        role: 'user',
                        cart: cart._id,
                    };
                    const createSessionControl = await sessionController.createUserControler(req, res, newUser);
                    if (createSessionControl.statusCode === 500) {
                        return done(null, false, {
                            message: createSessionControl.message
                        });
                    }
                    else if (createSessionControl.statusCode === 200) {
                        const user = createSessionControl.result;
                        return done(null, user);
                    }
                }
            };
        } catch (error) {
            req.logger.error(error)
            return done(null, false, {
                message: 'Error de registro en local.passport.js - Register: ' + error.message
            });
        };
    }
));
    // Segunda estrategia - Login:
    passport.use('login', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
    async (req, username, password, done) => {
        try {
            if (username === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
                let userAdmin = {
                    name: "Admin",
                    email: config.ADMIN_EMAIL,
                    age: "00",
                    role: "admin",
                    id: 0,
                    cart: 0,
                };
                return done(null, userAdmin);
            }
            else {
                const existDBSessionControl = await sessionController.getUserByEmailOrNameOrIdController(req, res, username);
                if (existDBSessionControl.statusCode === 500) {
                    return done(null, false, {
                        message: existDBSessionControl.message
                    });
                }
                else if (existDBSessionControl.statusCode === 404) {
                    return done(null, false, {
                        message: 'No hay una cuenta registrada con este correo. Presione "Regístrarse aquí" para crear una cuenta.'
                    });
                }
                else if (existDBSessionControl.statusCode === 200) {
                    const user = existDBSessionControl.result;
                    if (!isValidPassword(user, password)) {
                        req.logger.warn('El correo sí se encuentra registrado pero, la contraseña ingresada es incorrecta.')
                        return done(null, false, {
                            message: 'El correo sí se encuentra registrado pero, la contraseña ingresada es incorrecta.'
                        });
                    }
                    return done(null, user);
                }
            }
        } catch (error) {
            req.logger.error(error)
            return done(null, false, {
                message: 'Error de registro en local.passport.js - Login: ' + error.message
            });
        };
    }));
};