import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { baseUrl, endpointPrefix } from './fetcher';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!;
const redirectUri = process.env.NEXTAUTH_URL!;
const scope = 'openid profile email https://www.googleapis.com/auth/youtube';

// TODO: login(sign-up) 성공 시 - db로부터 user login 성공 데이터를 받아와
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login' || '/join',
  },
  providers: [
    GoogleProvider({
      name: 'google',
      clientId: clientId,
      clientSecret: clientSecret,

      async profile(profile, tokens) {
        // NOTE: Check TOKENSET and PROFILE before the process!
        console.info(
          '[INFO] Processing...\nTokenSet from OAuth 2.0 GoogleProvider\n',
          tokens,
        );
        console.log(
          '[INFO] Processing...\nProfile form OAuth 2.0 GoogleProvider\n',
          profile,
        );

        const logInBody = {
          email: profile.email,
          token: tokens.access_token,
        };

        const response = await fetch(
          baseUrl + endpointPrefix + '/users/login',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(logInBody),
          },
        );
        const dbUser = await response.json();
        console.info(
          '[INFO] Check DBUser: User Infomation from TubePlus Database\n',
          dbUser,
        );

        if (
          dbUser.message == '로그인 실패' ||
          dbUser.message == 'Internal Server Error' ||
          dbUser.message == '해당 회원이 존재하지 않습니다.'
        ) {
          console.error(
            "[ERROR] Log in Failed: User Data isn't exists in tubePlus Database...\n",
          );

          // redirect('/join'); //NOTE: redirect 안됨
        }

        tokens.user = {
          id: profile.sub as string,
          name: profile.name,
          email: profile.email,
          locale: profile.locale,

          image: dbUser.picture,
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
          locale: profile.locale,

          image: dbUser.picture,
          uuid: dbUser.data.uuid,
          username: dbUser.data.username,
          role: dbUser.data.role,
          is_creator: dbUser.data.isCreator,
          darkmode: dbUser.data.darkMode,
        };
      },

      authorization: {
        params: {
          scope: scope,
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
    async signIn({ user }) {
      if (user) {
        console.log('user', user);
      }
      return true;
    },
    async redirect() {
      return '/';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
