import Mailgen from "mailgen";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateMail = (user, email, otp) => {
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Sociality",
      link: "https://mailgen.js/", // this replace with site l deployed on it
    },
  });

  let response = {
    body: {
      name: user.firstName,
      intro:
        "You have received this email because a password reset request for your account was received.",

      action: {
        instructions: `This Code Below To reset Your Password`,
        button: {
          color: "#ed143d", // Optional action button color
          text: `OTP Code ${otp}`,
        },
      },
      outro:
        "If you did not request a password reset, no further action is required on your part.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",
    html: mail,
  };

  return message;
};

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1h" });
};
