const Pool = require("../config/db");

const createUser = (data) => {
  const { id, email, passwordHash, role } = data;
  const query = `
    INSERT INTO users(user_id, email, password, role)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [id, email, passwordHash, role];
  return Pool.query(query, values);
};

const findEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];
  const result = await Pool.query(query, values);
  return result;
};

module.exports = {
  createUser,
  findEmail,
};
