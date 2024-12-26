import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET); // Use an environment variable for production

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;


  if (token) {
    try {
      // Verify the token
      if (!SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined');
      }
      await jwtVerify(token, SECRET_KEY);

      // Redirect authenticated users from /sign-in or /sign-up to /home
      if (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up' ) {
        return NextResponse.redirect(new URL('/user/home', req.url));
      }

      return NextResponse.next(); // Proceed to the requested page
    } catch (err) {
      console.error('Invalid Token:', err);
      // Redirect to sign-in if token is invalid
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  } else {
    // Redirect to sign-in if token is missing and trying to access protected routes
    if (req.nextUrl.pathname !== '/sign-in' && req.nextUrl.pathname !== '/sign-up') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next(); // Proceed to the requested page
}

// Apply middleware to protected routes
export const config = {
  matcher: ['/user/home','/user/orders','/user/wishlists','/user/search', '/sign-in', '/sign-up'], // Adjust the paths as needed
};
