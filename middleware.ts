import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth';

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.get(AUTH_COOKIE)?.value === 'true';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = isAuthenticated(request);

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (pathname === '/login' || pathname === '/inquiry' || pathname.startsWith('/inquiry/')) {
    if (pathname === '/login' && authenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (!authenticated) {
    const loginUrl = new URL('/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('from', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|plugins|css|js|img|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
