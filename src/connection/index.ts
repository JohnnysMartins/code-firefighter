import { connect, connection } from 'mongoose';
import env from '../config/env';

const connectDb = (callback: any) => {
  connect(`${env.mongodb_url}/${env.mongodb_database_name}`);
  const db = connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    callback(db);
  });
}

export default connectDb;