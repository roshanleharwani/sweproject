// /pages/api/signout.js

import { serialize } from 'cookie';

export default function handler(req, res) {
  // Check if the request method is POST (or any method you prefer for signout)
  if (req.method === 'POST') {
    // Clear the cookie by setting it to an expired date
    res.setHeader('Set-Cookie', serialize('auth-token', '', { 
      httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      expires: new Date(0), // Expire the cookie immediately
      path: '/',  // Cookie applies to the whole domain
    }));
    
    // Respond with a successful signout message
    return res.status(200).json({ message: 'Signed out successfully' });
  }

  // Handle other HTTP methods if needed
  return res.status(405).json({ error: 'Method Not Allowed' });
}
