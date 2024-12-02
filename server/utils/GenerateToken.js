const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days
    httpOnly: true,
    sameSite: "Strict", // Ensures the cookie is only sent in requests from the same domain
    secure: false, // Secure flag should be true only in production
    domain: ".netlify.app", // Set the domain for Netlify hosted frontend
  });
};
