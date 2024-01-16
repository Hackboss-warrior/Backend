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

## Tareas a corregir

- [x] En el README.md estaría bien una docu de los endpoints, aunque como ya tenéis la colección de Postman no pasa nada.

- [x] La colección de Postman me la enviasteis a parte, pero estaría bien incluirla en el repo.

- [ ] No tiene mucho sentido lo de los ATTEMPS para arrancar el server. Si el server no arranca a la primera, seguramente haya algún error o esté el puerto ocupado.

- [x] Los campos nickName y avatar deberían ser UNIQUE.

- [x] Para el campo avatar os servía un VARCHAR en vez de un LONGTEXT. Lo mismo con "files" en la tabla de posts.

- [ ] Al registrarse, habéis complicado bastante la subida del avatar. No termino de ver por qué hacéis lo de guardarlo primero en una carpeta temp en vez de guardarlo directamente en uploads (sharp).

- [ ] Al hacer login, para buscar al usuario por mail o nickname, hacéis un SELECT de todos los users de la DB y luego hacéis un find. Podríais hacer el SELECT directamente del user que queréis.

- [x] El patchUser debería de tener método PATCH en vez de POST.

- [x] En patchUser llamáis a una función "selectUserById". Esta función no selecciona todos los users, selecciona por ID. Debería llamarse "selectUserById".

- [ ] No me convence el sistema de tags que habéis hecho para los posts. Tendríais que haber creado una tabla de mysql para las tags y relacionar posts con tags. La forma en la que lo hacéis podría funcionar, pero es muy importante que implementéis mejores validaciones, ya que ahora mismo puedo mandar cualquier texto con el formato que yo quiera o un objeto con la estructura que me de la gana.

- [x] Como os comenté muchas veces, al crear o modificar algo, el servidor debería responder con los datos completos de lo que se ha creado/modificado. Al crear un post y en más ocasiones, no respondéis con los datos completos del elemento creado/modificado (join).

- [ ] Al hacer un GET /posts, falta info en cada uno de los posts. Deberíamos de poder ver el username y avatar del usuario que crea el post, número de likes y dislikes... (join)

- [x] En deletePost, tenéis un montón de try catch que hacen lo mismo. Podríais borrar todos excepto el global.

- [x] En deletePost, os falta validar si el post existe.

- [x] En deletePost, os encargáis de borrar los comentarios, favoritos y esas cosas de los posts de forma manual. Si en las FOREIGN KEYS de estas tabals añadís "ON DELETE CASCADE", este borrado se hace de forma automática.

- [x] En el model "deleteCommentByPostId" tenéis un try catch que no deberíais tener. Además, llamáis a next() que no existe ahí.

- [ ] Al hacer un GET /post/:id, debería de devolver la información del post, lo comentado arriba (username y avatar del creador, likes, dislikes...) y la lista de comentarios (Join).

- [x] En patchPost falta validar con Joi.

- [ ] Los filtros deberían de incluírse en el endpoint GET /posts mediante query params. No tiene sentido tener dos endpoints diferentes para seleccionar posts. Además, un filtrado nunca debería de ser POST y los datos no deberían enviarse en el body, si no por query params.

- [x] En el interactPost línea 15, os sobran las condiciones selectPost.postId === postId && selectPost.userId === AuthUserId , ya que si selectPost existe, 100% va a tener ese postId y userId, porque ha sido seleccionado por esos valores.

- [ ] En interactPost no validáis si el post existe (join)

- [ ] La tabla interacts tiene un campo interaction que es un INT. Eso me va a permitir enviar un montón de números. ¿Qué sentido tiene que por ejemplo se guarde un 8? Entiendo que lo que queríais hacer es que pueda ser un like positivo o negativo. Para esto solo necesitáis un campo que sea un booleano. Si dicho campo de la interacción es true, entonces es un like. Si es false, entonces es un dislike.

- [ ] Al añadir favoritos no comprobáis si la noticia existe.

- [ ] Al ver la lista de favoritos, debería de verse toda la info del post, no solo los ids (join)

- [ ] En likeComments no comprobáis si el comentario existe. El campo like debería de ser un booleano como comentado anteriormente con las interacciones.

- [ ] Los ids se suelen enviar por path params en vez de en el body. Por ejemplo, en likeComments en vez de enviar el commentId en el body, estaría mejor incluirlo en la ruta, por ejemplo /likeComments/:commentId.

- [ ] El campo hierarchy de los comentarios imagino que es para poder responder a comentarios. No habéis documentado cómo funciona. Imagino que si por ejemplo el post 5 tiene un comentario con id 3 y este comentario una respuesta con id 8, la hierarchy sería 5.3.8. Mhhh igual que lo de los tags, no me convence mucho. Este tipo de cosas deberían de ir en tablas nuevas e ir relacionando comentarios con otros comentarios y así.. Ya que tal como lo hacéis, es simple texto almacenado en un campo, nada asegura que todos los IDs escritos en el campo hierarchy sean válidos.

- [x] Os falta un middleware express.static() para hacer pública la carpeta de "uploads" y que se puedan cargar las fotos con una petición GET a http://HOST:PUERTO/nombreArchivo.

- [ ] Os falta sobretodo mostrar más datos en las peticiones GET. Ahora mismo no puedo ver ni los likes de los posts, ni los dislikes, ni la lista de comentarios ni nada de eso.
