import { Model } from 'mongoose';

export type TUserRole = 'admin' | 'user';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  phone: string;
  address: string;
}

export interface TLoginUser {
  email: string;
  password: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
