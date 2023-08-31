# Desafio N°11 Implementación de Logger en Proyecto

## LEIBLICH Ezequiel Gaston

## Comisión 43345 - Programación Backend

------------------------------------------------------

## Implementación de Logger en Proyecto

En este repositorio, hemos implementado un sistema de registro (logger) en base a las directrices proporcionadas para mejorar la gestión de información y monitoreo en el proyecto principal.

## Definición de niveles de registro
Hemos establecido un sistema de niveles con la siguiente jerarquía de prioridades (de menor a mayor):

* depurar
* http
* información
* advertencia
* error
* fatal

## Logger para Desarrollo y Producción

Hemos configurado un registrador específico para el entorno de desarrollo y otro para el entorno de producción:

### Desarrollo

El registrador de desarrollo registra a partir del nivel "debug" y muestra los registros en la consola.

### Producción

El registrador de producción registra desde el nivel "info" y almacena los registros en un archivo de transporte llamado "errors.log" desde el nivel de error.

## Uso del registrador

Hemos integrado registros significativos en puntos clave del servidor, como errores y advertencias. Hemos modificado los console.log()estándares para que muestren información utilizando el módulo winston.

## Punto final /loggerTest

Hemos agregado un punto final /loggerTestque te permite probar todos los registros implementados, permitiendo verificar su funcionamiento y evaluar la eficacia de la configuración del registrador.

## Instrucciones:

1 - Clona este repositorio en tu máquina local.

2 - Configure las variables de entorno en un archivo .env si es necesario.

3 - Instale las dependencias requeridas utilizando npm install.

4 - Cargar variables de entorno, antes de levantar el servidor: npm run dev-D : npm run dev-P

5 - Ejecuta el servidor con npm start.

5 - Acceda a través del navegador al endpoint /loggerTestpara probar los registros implementados.

¡Gracias por revisar este trabajo mejorado con la integración de un sistema de logger! Si tienes preguntas o necesitas ayuda, no dudes en contactarme.
