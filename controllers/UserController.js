const userModel = require("../models/UserModel");
const passwordUtil = require("../utils/PasswordUtil");
const tokenUtil = require("../utils/TokenUtil");

const createUser = async (req, res) => {
  const hashedPassword = await passwordUtil.hashPassword(req.body.password);
  const user = Object.assign(req.body, { password: hashedPassword });
  console.log(user);

  try {
    const savedUser = await userModel.create(user);
    res.status(201).json({
      status: "success",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({ status: true }).populate("role");
    if (users) {
      res.status(200).json({
        status: "success",
        data: users,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "No user found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("1")

  try {
    const userFromEmail = await userModel.findOne({ email: email }).populate("role");
    console.log(userFromEmail)
    if (userFromEmail) {
      const isPasswordMatched = await passwordUtil.comparePassword(
        password,
        userFromEmail.password
      );
      console.log("3")
      if (isPasswordMatched) {
        const token = tokenUtil.generateToken(userFromEmail.toObject());
        res.status(200).json({
          status: "success",
          data: token,
          role: userFromEmail.role,
        });
        console.log("4")
      } else {
        res.status(401).json({
          status: "fail",
          message: "Incorrect password",
        });
        console.log("5")
      }
    } else {
      res.status(404).json({
        status: "fail",
        message: "No user found",
      });
        console.log("6")
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
      console.log("7")
  }
};
module.exports = {
  createUser,
  getAllUsers,
  loginUser,
};
