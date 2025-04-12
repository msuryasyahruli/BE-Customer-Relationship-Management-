const { createUser, findEmail } = require("../model/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

const usersController = {
  registerUser: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const { rowCount } = await findEmail(email);
      if (rowCount) {
        return res.json({ message: "Email is already taken" });
      }

      const passwordHash = bcrypt.hashSync(password, 10);
      const id = uuidv4();
      const data = {
        id,
        email,
        passwordHash,
        role,
      };

      const result = await createUser(data);
      commonHelper.response(res, result.rows, 201, "User created");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) {
        return res.json({ message: "Email is incorrect" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.json({ message: "Password is incorrect" });
      }

      delete user.password;
      const payload = {
        email: user.email,
        role: user.role,
      };

      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.refreshToken(payload);

      commonHelper.response(res, user, 201, "Login successful");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  profile: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },

  refreshToken: (req, res) => {
    const RefreshToken = req.body.refreshToken;
    const decoded = jwt.verify(RefreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.refreshToken(payload),
    };
    commonHelper.response(res, result, 201, "Token has refreshed");
  },
};

module.exports = usersController;
