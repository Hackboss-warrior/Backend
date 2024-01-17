import getPool from "../../db/pool.js";
let pool = await getPool();

const selectPostByTitle = async (title) => {
    const[[postWithSametitle]] = await pool.query(`SELECT users.nickName, users.avatar, posts.*, comments.comment, interacts.postId, interacts.userId, interacts.interaction FROM users INNER JOIN posts ON users.id = posts.userId LEFT JOIN comments ON posts.id = comments.postId LEFT JOIN interacts ON posts.id = interacts.postId WHERE  posts.title = ?`, [`%${title}%`]);
    return postWithSametitle;
}

export default selectPostByTitle
