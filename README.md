[![nodejs](https://img.shields.io/badge/Node.js-V20.10.0-green)](https://nodejs.org/en)
[![bcrypt](https://img.shields.io/badge/bcrypt-V5.1.1-blue)](https://www.npmjs.com/package/bcrypt)
[![dotenv](https://img.shields.io/badge/dotenv-V16.3.1-red)](https://www.npmjs.com/package/dotenv)
[![express](https://img.shields.io/badge/express-V4.18.2-olive)](https://www.npmjs.com/package/express)
[![mysql2](https://img.shields.io/badge/mysql2-V3.6.5-aqua)](https://www.npmjs.com/package/mysql2)
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-V9.0.2-silver)](https://www.npmjs.com/package/jsonwebtoken)
[![morgan](https://img.shields.io/badge/mysql2-V1.10.0-aqua)](https://www.npmjs.com/package/morgan)
[![cors](https://img.shields.io/badge/jsonwebtoken-V2.8.5-olive)](https://www.npmjs.com/package/cors)
[![nodemailer](https://img.shields.io/badge/nodemailer-V6.9.7-red)](https://www.npmjs.com/package/nodemailer)
[![joi](https://img.shields.io/badge/joi-V17.11.0-aqua)](https://www.npmjs.com/package/joi)

# fakNews Backend

**Parte I: Desarrollo de la API Backend**

Este documento constituye la primera etapa del proyecto FakeNews, focalizada en el desarrollo de la API backend. La API backend es un componente fundamental de esta aplicación, encargada de gestionar la lógica de funcionamiento, el almacenamiento de datos y la interacción con el frontend.

El propósito principal de esta fase es establecer una sólida base técnica que permita la autenticación, la gestión de usuarios, el almacenamiento de información verídica y la detección de noticias falsas mediante algoritmos y técnicas de procesamiento de lenguaje natural.

La API backend actuará como el núcleo de la aplicación, brindando soporte para la verificación y validación de la autenticidad de las noticias proporcionadas por los usuarios. Además, se implementarán medidas de seguridad robustas para garantizar la integridad de los datos y prevenir posibles vulnerabilidades.

En esta fase inicial, nos enfocaremos en:

Diseño de la Arquitectura: Definición de la estructura técnica de la API, incluyendo las tecnologías, protocolos y patrones a utilizar.

Desarrollo de Endpoints: Creación de puntos finales (endpoints) para la comunicación entre el frontend y el backend, facilitando la interacción de los usuarios con la aplicación.

Implementación de Funcionalidades Básicas: Configuración de la autenticación de usuarios, la gestión de sesiones y la interacción con la base de datos.

Este primer paso es fundamental para sentar las bases sólidas sobre las cuales se construirá la funcionalidad completa de detección de noticias falsas en etapas posteriores del desarrollo.

La API backend se concibe como el motor principal que impulsará la aplicación FakeNews, permitiendo la validación y verificación de información para promover la autenticidad y veracidad en el ámbito de la información digital.

**_Se invita a revisar gitBook para obtener una visión más detallada sobre el funcionamiento y los componentes adicionales de este proyecto._**
https://hackaboss.gitbook.io/faknews/

# PRIMEROS PASOS

## Primer paso

Instale las dependencias del proyecto ejecutando el siguiente comando.

```
npm i
```

## Segundo paso

Renombrar el .envexample a .env y completar los valores sin comillas excepto la contraseña y el token que va entre comillas.

```
npm run initDb
```

## Tercer paso (opcional)

En caso de tener la base de datos creada y querer borrarla ejecutar el comando.

```
npm run dropDb
```

## Cuarto paso (opcional)

En caso de no tener la base de datos creada y querer crear una ejecutar el comando.

```
npm run initDb
```

## Quinto paso

Para arrancar el servidor ejecutar.

```
npm start
```
