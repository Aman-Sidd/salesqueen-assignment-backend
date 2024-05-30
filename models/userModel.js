const db = require("../config/database");

const User = {
  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) callback(err, null);
      callback(null, result[0]);
    });
  },

  create: (userData, callback) => {
    const { name, email, password, phone } = userData;
    const sql =
      "INSERT INTO user (name, email, password, phone) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, password, phone], (err, result) => {
      if (err) callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = User;
