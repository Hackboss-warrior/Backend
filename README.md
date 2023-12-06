# Backend

Esta es la parte I del proyecto backend

# Backend

Esta es la parte I del proyecto backend

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
