import jwt from "jsonwebtoken";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export default function (req, res, next) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  console.log('Token:', token);
  if (!token) return sendErrorResponse(res, 409, "Access not allowed!⛔");

  const { _id, role } = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Decoded Token:', { _id, role });
  req.userInfo = { userId: _id, role };
  if (!req.userInfo) return sendErrorResponse(res, 409, "Access not allowed!⛔");
  console.log('User Info:', req.userInfo);
  next();
}
