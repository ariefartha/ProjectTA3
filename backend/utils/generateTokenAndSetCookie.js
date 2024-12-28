import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none", // Mengizinkan lintas domain
    secure: true, // Gunakan untuk koneksi HTTPS
  });
  return token;
};

export default generateTokenAndSetCookie;
