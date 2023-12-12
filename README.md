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

# fakeNews Backend

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

***Se invita a revisar el resto del documento para obtener una visión más detallada sobre el funcionamiento y los componentes adicionales de este proyecto.***


# Instrucciones
> [!NOTE]
> Deberás tener instalado Node.js y las dependencias para arrancar el servidor. 

> [!TIP]
> Se recomienda tener libre el puerto 3001 o 5000 para la ejecución del servidor.
~~~

~~~
1. **Primer paso**
     - Renombrar el .envexample a .env y completar los valores sin comillas exepto la contraseña y el token que va entre comillas.
2. **Segundo paso** (opcional)
    - En caso de no tener la base de datos creada ejecutar el comando npm run initDb.
3. **Tercer paso** 
    - En caso de no tener la base de datos creada ejecutar el comando npm run initDb.
4. **cuarto paso** 
    - Ejecutar npm start para arrancar el servidor.
    ~~~
    npm start
    ~~~
    
> [!IMPORTANT]  
> Para garantizar seguridad en tu página web no compartas ni enseñes el Token puesto en .env.
---

# Peticiones

  - POST http://localhost:5000/login => Iniciar sesión
  - POST http://localhost:5000/register => Registrar usuarios
  - POST http://localhost:5000/posts
  - POST http://localhost:5000/liked
  - POST http://localhost:5000/user
  - DELETE http://localhost:5000/delete/id => Noticia a borrar

## Datos requeridos para cada peticion

- http://localhost:5000/login => {"email": "algo@example.com", "nickName": "Juan", "password": "1234"}
- http://localhost:5000/register => {"name": "Pepito", "firstName": "Perez", "nickName": "Juan", "email": "algo@example.com", "password": "1234", "DOB": "1920-12-01"}

>[!NOTE]
>No es obligatorio en la peticion de login introducir email y nickname cualquiera de los dos es válido para logearse.
>No es obligatorio en la peticion de register los campos de firstName

# Resto
3 partes:

- Usuario anónimo. --> Ofrecer la posibilidad de login/register.

  - No puede subir publicaciones.
  - No puede ver contenido +18.
  - No puede dar like/dislike/comentar o guardar, pero si puede compartir a través de enlace.
  - No puede seguir a otros usuarios.
  - Puede utilizar filtros.

- Usuario registrado.

  - Gestión de perfil de usuario (editar sus propios datos)
  - Dar like/dislike a otras noticias, compartir dentro y fuera de la plataforma.

- Proceso de registro.

  - Identificador único del usuario.
  - Nickname único
  - Nombre NOT NULL
  - Apellido
  - Fecha nacimiento NOT NULL
  - Email único
  - password hashed

- Publicación:

  - Quién publica (nickname)
  - Fecha publicación
  - Título
  - Formato gráfico (foto, vídeo, gif, etc.)
  - Entradilla
  - Body de la noticia (texto)
  - Tema (Categorías --> Tags)
  - Solo backend identificador único (Similar a como funciona el JWT)
  - Foreign Key --> Id (identificador único del usuario)

- Like/Dislike

  - Id Publicación
  - Id Usuario que reaccionó
  - Like/Dislike/null(drop)
  - Gestionar si el usuario creador borra la publicación

- Gestión guardado (favoritos)

  - Id guardado
  - Id publicación
  - Id Usuario que guardo
  - True/null (drop)
  - (Gestionar si el usuario creador borra la publicación)

- Gestión de comentarios en publicaciones (opcional)

  - Id comentario
  - Id publicación
  - Id Usuario que comenta
  - Contenido del comentario
  - Fecha comentario

- Like/Dislike/Respuesta comentario
  - Id único
  - Id comentario
  - Id usuario que responde
  - Like/Dislike/Null
  - Contenido de la respuesta
