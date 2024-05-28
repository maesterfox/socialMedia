import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.error("Database query error during registration check:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length) {
      console.warn("User already exists:", req.body.username);
      return res.status(409).json({ error: "User already exists!" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Database query error during user creation:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("User created successfully:", req.body.username);
      return res.status(200).json({ message: "User has been created." });
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.error("Database query error during login:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length === 0) {
      console.warn("User not found:", req.body.username);
      return res.status(404).json({ error: "User not found!" });
    }

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkPassword) {
      console.warn("Wrong password for user:", req.body.username);
      return res.status(400).json({ error: "Wrong password or username!" });
    }

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .status(200)
      .json({ ...others, accessToken: token }); // Ensure token is included in the response
    console.log("Login successful for user:", req.body.username);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: false,
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "User has been logged out." });
  console.log("Logout successful");
};
