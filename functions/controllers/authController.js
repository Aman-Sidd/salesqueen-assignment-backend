const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = (req, res) => {
  const { name, email, password, phone } = req.body;

  User.findByEmail(email, (err, user) => {
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create(
      { name, email, password: hashedPassword, phone },
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", error: err });

        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET);

        res.status(201).json({ message: "User created", token });
      }
    );
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Logged in successfully", token });
  });
};

module.exports = { register, login };
