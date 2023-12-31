import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

const locales = ['en', 'ko'];
const publicPages = [
  '/',
  '/login',
  '/join',
  '/about',
  '/team',
  '/help',
  '/policies-agreements',
];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always', //for intercepting routes
});

const authMiddleware = withAuth(
  // req => intlMiddleware(req),
  function onSuccess(req) {
    return intlMiddleware(req);
  },

  {
    pages: {
      signIn: '/login',
      error: '/error',
    },

    callbacks: {
      // authorized: ({ token }) => token?.role == ('MEMBER' || 'ADMIN'),
      authorized: ({ token }) => token != null,
    },
  },
);

export default function middleware(req: NextRequestWithAuth) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
  // matcher: ['/', '/(en|ko)/:path*'],
};
