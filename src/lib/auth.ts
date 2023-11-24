import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { baseUrl, endpointPrefix, preLogin, retrieveUser } from './fetcher';
import Swal from 'sweetalert2';

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
    signIn: '/login',
    error: '/error',
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

        const preResponse = await preLogin(logInBody);

        let db = await preResponse.json();
        console.info(
          '[INFO] Check db: User Infomation from TubePlus Database\n',
          db,
        );
        let isRetrieved = false;

        if (
          db.message == '로그인 실패' ||
          db.message == 'Internal Server Error' ||
          db.message == '해당 회원이 존재하지 않습니다.'
        ) {
          console.error(
            "[ERROR] Log in Failed: User Data isn't exists in tubePlus Database...\n",
          );
          throw new Error(db);
          // redirect('/join'); //NOTE: redirect 안됨
        }
        if (db.message == '탈퇴한 유저입니다.') {
          const response = await retrieveUser(logInBody);
          db = await response.json();
          isRetrieved = true;
        }

        tokens.user = {
          id: profile.sub as string,
          name: profile.name,
          email: profile.email,
          locale: profile.locale,

          image: db.data.profileImage,
          bio: db.data.bio,
          uuid: db.data.uuid,
          username: db.data.username,
          role: db.data.role,
          is_creator: db.data.isCreator,
          darkmode: db.data.darkMode,
          status: db.satus,
          is_retrieved: isRetrieved,
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

          locale: db.data.locale,
          bio: db.data.bio,
          image: db.data.profileImage,
          token: tokens.access_token,
          uuid: db.data.uuid,
          username: db.data.username,
          role: db.data.role,
          is_creator: db.data.isCreator,
          darkmode: db.data.darkMode,
          status: db.status,
          is_retrieved: isRetrieved,
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
    async session({ token, session, user, newSession }) {
      console.info('[INFO] Check user session: User Session\n');

      session.user = token;
      return session;
    },
    async signIn({ user, profile }) {
      if (user) return true;
      return false;
    },
    async redirect() {
      return '/';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
