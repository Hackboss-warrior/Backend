import getPool from "../../db/pool.js";
let pool = await getPool();

const insertContactForm = async ({  subject, email, body }) => {
  let [{ commentPosted }] = await pool.query(
    `INSERT INTO contactPoint ( subject, email, body) 
     VALUES (?,?,?)`,
    [ subject, email, body]
  );
  return commentPosted;
};



export default insertContactForm


