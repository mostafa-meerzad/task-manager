const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/user");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    console.log("something went wrong ", err.message);
    return res.status(500).send("server error");
  }
});

router.post(
  "/",
  [
    check("email", "please include a valid email"),
    check("password", "password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {

        console.log("something went wrong")
        res.status(500).send("server error")
    }
  }
);

module.exports = router;
