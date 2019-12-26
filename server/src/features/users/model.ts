/*
 * @see
 * https://mongoosejs.com/docs/guide.html#definition
 * https://mongoosejs.com/docs/schematypes.html#what-is-a-schema-type
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: String;
  email: String;
  password: String;
}

const UsersSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UsersModel = mongoose.model<IUser>('Users', UsersSchema);

export { UsersModel };
