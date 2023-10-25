import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

export enum Role {
  user = 'MEMBER',
  admin = 'ADMIN',
}

interface IUser extends DefaultUser {
  uuid?: string;
  id: string;
  locale: string;
  image: string;
  role?: Role;
  darkmode?: boolean;
  is_creator?: boolean;
}
declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface User extends IUser {}
  interface JWT extends User {}
}
