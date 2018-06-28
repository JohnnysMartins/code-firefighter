import { Schema, model } from 'mongoose';

const databaseSchema = new Schema({
  message: String
});

const ErrorModel = model('Error', databaseSchema);

export default ErrorModel;