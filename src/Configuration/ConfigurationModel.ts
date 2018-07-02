import { Schema, model } from 'mongoose';

const databaseSchema = new Schema({
  permissions: {
    type: Map,
    of: Boolean
  }
});

const ConfigurationModel = model('Configuration', databaseSchema);

export default ConfigurationModel;