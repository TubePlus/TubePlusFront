import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { baseUrl, endpointPrefix } from './fetcher';
import { redirect } from 'next/navigation';

// TODO: login(sign-up) 성공 시 - db로부터 user login 성공 데이터를 받아와
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/join',
  },
  providers: [
    {
      id: 'google-custom',
      name: 'Google',
      type: 'oauth',
      version: '2.0',
      accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
      requestTokenUrl: 'https://accounts.google.com/o/oauth2/auth',
      wellKnown: 'https://accounts.google.com/.well-known/openid-configuration',
      profileUrl: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        },
      },

      profile(profile, tokens) {
        console.info(
          '[INFO] Check TokenSet: TokenSet from OAuth 2.0 CustomProvier "google-custom"\n',
          tokens,
        );
        return { ...profile, ...tokens };
      },
    },

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      async profile(profile, tokens) {
        console.info(
          '[INFO] Check TokenSet: TokenSet from OAuth 2.0 GoogleProvider\n',
          tokens,
        ); // NOTE: Check TOKENSET before the process!

        console.log('[INFO] Check profile: profile\n', profile);

        const response = await fetch(
          baseUrl + endpointPrefix + '/users/login',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(profile.email),
          },
        );
        const dbUser = await response.json();
        console.info(
          '[INFO] Check DBUser: User Infomation from TubePlus Database\n',
          dbUser,
        );

        if (dbUser.message == '로그인 실패') {
          console.error(
            "[ERROR] Log in Failed: User Data isn't exists in tubePlus Database...\n",
          );

          // redirect('/join'); //NOTE: redirect 안됨
        }

        tokens.user = {
          id: profile.sub as string,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          locale: profile.locale,

          uuid: dbUser.data.uuid,
          username: dbUser.data.username,
          role: dbUser.data.role,
          is_creator: dbUser.data.isCreator,
          darkmode: dbUser.data.darkMode,
        };

        console.log(
          '[INFO] GoogleProvider Profile is setted by tokens.',
          tokens,
          '\n\n\n',
        );

        return {
          id: profile.sub as string,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          locale: profile.locale,

          uuid: dbUser.data.uuid,
          username: dbUser.data.username,
          role: dbUser.data.role,
          is_creator: dbUser.data.isCreator,
          darkmode: dbUser.data.darkMode,
        };
      },

      authorization: {
        params: {
          scope: 'openid profile email https://www.googleapis.com/auth/youtube',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.info('[INFO] Callback JWT is Processing...\n');
      if (trigger === 'update') return { ...token, ...session.user };

      return { ...token, ...user };
    },
    async session({ token, session, user }) {
      console.info('[INFO] Check user session: User Session\n');
      session.user = token;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
