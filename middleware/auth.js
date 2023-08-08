const jwt = require("jsonwebtoken");
require("dotenv").config()

const {User}=require("../models/index")

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ msg: "Login again, session expired" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_CODE);

    const { userId } = decodedToken;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).send({ msg: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({ msg: "Unauthorized server error" , err:err.message});
  }
};

module.exports = {
  authenticate,
};
