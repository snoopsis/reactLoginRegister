const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../models/User");

// @ Route POST api/users
// @desc  Register a user
// @access Public
router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "Esse email ja existe!" });
      }

      user = new User({
        name,
        lastName,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @ Route PUT api/users/:id
// @desc  Update User
// @access Private
router.put("/:id", auth, async (req, res) => {
  const { name, lastName, email } = req.body;

  // Build contact object
  const userFields = {};
  if (name) userFields.name = name;
  if (lastName) userFields.lastName = lastName;
  if (email) userFields.email = email;

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ Route PUT api/users/avatar/:id
// @desc  Update User Avatar
// @access Private
router.post("/avatar/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.file;
      let id = req.params.id;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      // avatar.mv("./client/public/files/" + id + avatar.name);
      avatar.mv("./client/public/files/perfil/" + id + ".jpg");

      // user = await User.findByIdAndUpdate(req.params.id, {
      //   avatar: id + avatar
      // });

      user = await User.findByIdAndUpdate(req.params.id, {
        avatar: id + avatar
      });

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// @ Route PUT api/users/senha/:id
// @desc  Update User Password
// @access Private
router.put("/senha/:id", auth, async (req, res) => {
  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);

  passwordSalt = await bcrypt.hash(password, salt);

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user = await User.findByIdAndUpdate(req.params.id, {
      password: passwordSalt
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
