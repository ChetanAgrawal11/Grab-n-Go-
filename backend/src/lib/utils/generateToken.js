import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET,   // make sure JWT_SECRET is set in your .env
    { expiresIn: '7d' }       // token valid for 7 days
  );
};
