import { Schema, model } from 'mongoose';

const databaseSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  picture: String,
  permissions: Schema.Types.Mixed
});

const UserModel = model('User', databaseSchema);

export default UserModel;