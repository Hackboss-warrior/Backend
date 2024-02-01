import getPool from "../../db/pool.js";
let pool = await getPool();

const selectPostByTitle = async (title) => {


    const [postWithSametitle] = await pool.query(`SELECT users.nickName, users.avatar,users.id as identifierUser, posts.*, 
    comments.comment, interacts.postId as interactionPostIdentifier, interacts.userId as interactsUserIdentifier , interacts.interaction 
    FROM  users  
    INNER JOIN 
      posts ON users.id = posts.userId 
    LEFT JOIN 
        comments ON posts.id = comments.postId 
    LEFT JOIN 
        interacts ON posts.id = interacts.postId 
    WHERE  
      posts.title LIKE ?`, [`%${title}%`]);
    return postWithSametitle;

}

export default selectPostByTitle;

