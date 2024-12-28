// import jwt from "jsonwebtoken";

// const generateTokenAndSetCookie = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });
//   res.cookie("jwt", token, {
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000,
//     sameSite: "none", // Mengizinkan lintas domain
//     secure: true, // Gunakan untuk koneksi HTTPS
//   });
//   return token;
// };

// export default generateTokenAndSetCookie;

import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res, secure = true) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    res.cookie("jwt", token, {
      httpOnly: true, // Prevent cookie from being accessed by JavaScript
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // CSRF attack prevention
      secure, // Only transmit cookie over HTTPS
    });

    return token;
  } catch (err) {
    console.error("Token generation error:", err);
    throw new Error("Failed to generate token");
  }
};

export default generateTokenAndSetCookie;
