import { Schema, model } from 'mongoose';

const databaseSchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  trace: { type: String, required: true },
  date: { type: String, required: true },
  appName: { type: String, required: true},
  code: String || Number,
  userAgent: String,
  isNodeError: Boolean,
  os: String
});

const ErrorModel = model('Error', databaseSchema);

export default ErrorModel;