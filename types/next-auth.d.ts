import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

export enum Role {
  user = 'MEMBER',
  admin = 'ADMIN',
}

export interface DBUserProps extends DefaultUser {
  id: string;
  uuid?: string;
  name?: string;
  username?: string;
  email: string;
  image: string;
  bio?: string;
  role?: Role;
  locale?: string;
  darkmode?: boolean;
  link?: [{ url: string }];
  is_creator?: boolean;
  created_at?: string;
}

declare module 'next-auth' {
  interface User extends DBUserProps {}
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface User extends DBUserProps {}
  interface JWT extends User {}
}
