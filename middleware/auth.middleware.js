const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ msg: "Missing Authorization header" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.TOKEN_SIGN_SECRET);

      req.userId = decodedData.user._id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData.sub;
    }

    next();
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

module.exports = authMiddleware;
