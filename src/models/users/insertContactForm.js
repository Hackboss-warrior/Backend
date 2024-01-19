import getPool from "../../db/pool.js";
let pool = await getPool();

const insertForm = async (subject, email,body) => {

  const [message]  = await pool.query(
    `INSERT INTO contactForm (subject, email, body) VALUES (?,?,?)`,
    [subject, email,body]

  );
  return message;
};

export default insertForm;
