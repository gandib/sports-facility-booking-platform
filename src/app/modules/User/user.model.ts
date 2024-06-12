import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { role } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>({
  name: { type: String, required: [true, 'Name is required!'] },
  email: { type: String, required: [true, 'Email is required!'], unique: true },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    select: 0,
  },
  role: {
    type: String,
    enum: {
      values: role,
      message: '{VALUE} is not valid!',
    },
  },
  phone: { type: String, required: [true, 'Phone is required!'] },
  address: { type: String, required: [true, 'Address is required!'] },
});

userSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
