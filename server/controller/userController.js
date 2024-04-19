const { User, validate } = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with given username already exist" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User Created Successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createUser };
