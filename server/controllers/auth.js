import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1h" });
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "This Fields are required" });

    const foundUser = await User.findOne({ email });
    if (foundUser)
      return res
        .status(400)
        .json({ msg: "This is User is already registered" });

    const salt = await bcrypt.genSalt();
    const hashPwd = await bcrypt.hash(password, salt);

    const newUser = await User.create({ ...req.body, password: hashPwd });

    const { password: pwd, ...others } = newUser._doc;
    res.status(201).json(others);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "This Fields are required" });

    //find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User not found Please Sign up" });

    const confirmPwd = await bcrypt.compare(password, user.password);

    if (!confirmPwd)
      return res.status(400).json({ msg: "Wrong Password Please Try Again" });

    const accessToken = generateAccessToken(user._id);

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_JWT_KEY,
      { expiresIn: "1d" }
    );

    const { password: pwd, ...others } = user._doc;
    res
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: others, accessToken });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const logout = async (req, res) => {
  const { jwt: JWT } = req.cookies;
  try {
    if (!JWT) return res.sendStatus(204);
    res
      .clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .sendStatus(204);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createResetPassword = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "This User Not Register" });
    req.app.locals.OTP = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    req.app.locals.userEmail = email;

    // hndle send mail to gmail with otp code
    return res.status(200).json({
      msg: "Checked Your Email To reset Your Password",
      code: req.app.locals.OTP,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const verifyOtp = (req, res) => {
  const { code } = req.query;
  const { OTP } = req.app.locals;
  if (parseInt(OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetPassword = true; // start session for reset password
    return res.status(201).send({
      msg: "Verify Successsfully!",
      flag: req.app.locals.resetPassword,
    });
  }
  return res.status(400).send({ error: "Invalid OTP" });
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { userEmail } = req.app.locals;

  if (!req.app.locals.resetPassword)
    return res.status(440).send({ error: "Session expired!" });
  try {
    const user = await User.findOne({ email: userEmail });
    const salt = await bcrypt.genSalt();
    const hashPwd = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(
      user._id,
      { password: hashPwd },
      { new: true }
    );

    req.app.locals.resetPassword = false;
    res.status(200).json({ msg: "Updated Recorded" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
