export const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetPassword: false,
    userEmail: null,
  };

  next();
};
