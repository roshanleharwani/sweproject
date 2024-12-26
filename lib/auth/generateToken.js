import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign(
    {email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '5h' }
  );
}
