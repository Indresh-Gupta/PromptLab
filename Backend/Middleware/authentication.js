import jwt from "jsonwebtoken";

export const ensureAuthentication = (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) {
      return res.status(402).json({ msg: "Token is not found" });
    }

    const result = jwt.verify(auth, process.env.JWT_KEY_TOKEN);
    req.user = result;

    // ✅ Do NOT send response here — allow next handler to run
    next();
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

// ✅ Use this if you want to destructure the import
// module.exports = { ensureAuthentication };

// 🔄 Or use this instead if you want direct import
// module.exports = ensureAuthentication;