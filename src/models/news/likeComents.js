import getPool from "../../db/pool";
let pool = await getPool();

const likeComment = async({postId, AuthUserId, commentId}) =>{
    let [{ likeComment }] = await pool.query(
        `INSERT INTO likeComments(postId, AuthUserId, commentId) VALUES (?,?,?)`,
        [postId, AuthUserId, commentId]
    );
    
    return likeComment
}

export default likeComment;