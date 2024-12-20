import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //this cookie can't be accessed by javascript in browser that make more secure
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    sameSite: "strict", //CSRF attack prevention
  });

  return token;
};

export default generateTokenAndSetCookie;
