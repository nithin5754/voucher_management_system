const { mssql } = require("../database/connection");
const bcrypt = require("bcrypt");

module.exports = {

/**
 * 
 * @param {username:string, email:string, password:string confirmPassword:string} req.body
 * @returns {success: true, message: "Registration successful!"}
 * @description "create new user"
 */

  create: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;

      console.log(req.body);

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Passwords do not match!" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const existingUser =
        await mssql.query`SELECT * FROM Users WHERE email = ${email} OR username = ${username}`;

      if (existingUser.recordset.length > 0) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Email or username already exists!",
          });
      }

      await mssql.query`INSERT INTO Users (username, password, email) VALUES (${username}, ${hashedPassword}, ${email})`;

      return res
        .status(201)
        .json({ success: true, message: "Registration successful!" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  },

  /**
 * 
 * @param {username:string, password:string } req.body
 * @param {user:{id,username,email}} req.session
 * @returns {success: true, message: "login successful!"}
 * @description "login user"
 */


  loginData: async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await mssql.query`
          SELECT * FROM Users 
          WHERE username = ${username}
      `;
      const user = result.recordset[0];

      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        if (req.session.user && req.session.user.id) {
          await mssql.query`
        INSERT INTO Settings (user_id)
        VALUES (${req.session.user.id})
       `;
        }
        return res
          .status(200)
          .json({ success: true, message: "Login successful!" });
      } else {
        return res
          .status(400)
          .json({ success: true, message: "Invalid Credentials" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  },


  /**
 * 
 * @param {null } req.body
 * @returns {success: true, message: "logout successful!"}
 * @description "logout user"
 */

  logout: (req, res) => {
    if (req.session.user) {
      console.log(`${req.session.user.fullname} logged out`);
    }
    req.session.destroy();
    return res.redirect("/");
  },
};
