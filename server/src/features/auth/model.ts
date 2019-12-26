/*
 * @see
 * https://mongoosejs.com/docs/guide.html#definition
 * https://mongoosejs.com/docs/schematypes.html#what-is-a-schema-type
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IAuths extends Document {
  username: String;
  email: String;
  password: String;
}

const AuthsSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const AuthsModel = mongoose.model<IAuths>('Auth', AuthsSchema);

export { AuthsModel };
