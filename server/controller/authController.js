const { User } = require("../models/userModel");
const joi = require("joi");
const bcrypt = require("bcrypt");

const authController = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({ message: "Invalid Username or Password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Username or Password" });
    }
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const validate = (data) => {
  const schema = joi.object({
    username: joi.string().required().label("Username"),
    password: joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { authController };
