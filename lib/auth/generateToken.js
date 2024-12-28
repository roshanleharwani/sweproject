import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign(
    {email: user.email, firstName: user.firstName, lastName: user.lastName},
    process.env.JWT_SECRET
    // Removed expiresIn option - token will never expire
  );
}
