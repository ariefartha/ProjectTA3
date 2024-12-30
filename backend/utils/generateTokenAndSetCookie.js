const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, 
    sameSite: 'Lax', 
    maxAge: 24 * 60 * 60 * 1000, 
    path: "/", 
  });
  return token;
};