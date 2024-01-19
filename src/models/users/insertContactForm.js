import getPool from "../../db/pool.js";
let pool = await getPool();

const insertForm = async (asunto, email,body) => {

  const [message]  = await pool.query(
    `INSERT INTO contactForm (asunto, email, body) VALUES (?,?,?)`,
    [asunto, email,body]

  );
  return message;
};

export default insertForm;
