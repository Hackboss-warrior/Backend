import getPool from "../../db/pool.js";
let pool = await getPool();


const likeInteract = async ( binaryLikes, postId,AuthUserId ) => {
    try { 
        
        await pool.query(`insert into interacts(interaction,postId,userId) values(?,?,?)`, [binaryLikes, postId,AuthUserId]);
       
        return console.log(`yes, thas fuking awesome  👻`);
    }catch (error) {
       
        console.error(error);
    }
};

const modifyInteraction = async ( binaryLikes, postId,AuthUserId ) => {
    try { 
        
        await pool.query(
            'UPDATE interacts SET interaction = ? WHERE postId = ? AND userId = ?',
            [binaryLikes, postId, AuthUserId]
          );
       
        return console.log(`yes, thas fuking terrible  👻`);
    }catch (error) {
        console.error(error);
    }
};

const dropInteraction = async ( binaryLikes, postId,AuthUserId ) => {
    try { 
        
        await pool.query(
            'DELETE FROM interacts WHERE postId = ? AND userId = ? AND interaction = ?',
            [postId, AuthUserId, binaryLikes]
          );
       
        return console.log(`yes, thas fuking terrible  👻`);
    }catch (error) {
        console.error(error);
    }
};

export { likeInteract, modifyInteraction, dropInteraction };