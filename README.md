# Desafio N°11 Implementación de logger

## LEIBLICH Ezequiel Gaston

## Comisión 43345 - Programación Backend

----------------------------------------------------

# Implementación de Logger en Proyecto

En este repositorio, hemos implementado un sistema de registro (logger) en base a las directrices proporcionadas para mejorar la gestión de información y monitoreo en el proyecto principal.

## Definición de Niveles de Registro

Hemos establecido un sistema de niveles con la siguiente jerarquía de prioridades (de menor a mayor):

*debug
*http
*info
*advertencia
*error
*fatal

## Logger para Desarrollo y Producción

Hemos configurado un logger específico para el entorno de desarrollo y otro para el entorno de producción:

## Desarrollo

El logger de desarrollo registra a partir del nivel "debug" y muestra los registros en la consola.

## Producción

El logger de producción registra a partir del nivel "info" y almacena los registros en un archivo de transporte llamado "errors.log" a partir del nivel de error.

## Uso del Logger

Hemos integrado registros significativos en puntos clave del servidor, como errores y advertencias. Hemos modificado los console.log() estándar para que muestren información utilizando el módulo winston.

## Endpoint /loggerTest

Hemos agregado un endpoint /loggerTest que te permite probar todos los registros implementados, permitiendo verificar su funcionamiento y evaluar la eficacia de la configuración del logger.

## Instrucciones:

1 - Clona este repositorio en tu máquina local.

2 - Configura las variables de entorno en un archivo .env si es necesario.

3 - Instala las dependencias requeridas utilizando npm install.

4 - Ejecuta el servidor con npm start o el comando correspondiente a tu configuración.

5 - Accede a través del navegador al endpoint /loggerTest para probar los registros implementados.

¡Gracias por revisar este trabajo mejorado en mi proyecto con la integración de un sistema de logger! Si tienes preguntas o necesitas ayuda, no dudes en contactarme.
