/*
 * @see
 * https://mongoosejs.com/docs/guide.html#definition
 * https://mongoosejs.com/docs/schematypes.html#what-is-a-schema-type
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: object;
  password: string;
  imgUrl?: string;
  googleAccount?: { accessToken: string };
  facebookAccount?: { accessToken: string };
}

const UsersSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function() {
      const { googleAccount, facebookAccount } = this;
      const isPasswordRequired = !!googleAccount.accessToken || !!facebookAccount.accessToken;
      return !isPasswordRequired;
    },
  },
  imgUrl: String,
  googleAccount: {
    accessToken: { type: String },
  },
  facebookAccount: {
    accessToken: { type: String },
  },
});

const UsersModel = mongoose.model<IUser>('Users', UsersSchema);

export { UsersModel };
