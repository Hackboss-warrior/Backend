import getPool from "../../db/pool.js";
let pool = await getPool();


const IFukingLiked = async ( binaryLikes, postId,AuthUserId ) => {
    try { 
        
        await pool.query(`insert into interacts(interaction,postId,userId) values(?,?,?)`, [binaryLikes, postId,AuthUserId]);
       
        return console.log(`yes, thas fuking awesome  👻`);
    }catch (error) {
       
        console.error(error);
    }
};



const IFukingHated = async ( binaryLikes, postId,AuthUserId ) => {
    try { 
        
        
        await pool.query(`insert into interacts(interaction,postId,userId) values(?,?,?)`, [binaryLikes, postId,AuthUserId]);
       
        return console.log(`yes, thas fuking terrible  👻`);
    }catch (error) {
        console.error(error);
    }
};




export { IFukingLiked, IFukingHated };