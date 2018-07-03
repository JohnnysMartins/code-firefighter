export default {
  server_port: process.env.PORT || 3000,
  mongodb_url: process.env.MONGO_URL || 'mongodb://localhost:27017',
  mongodb_database_name: process.env.MONGO_DB || 'firefighter',
  redis_url: process.env.REDIS_URL || 'localhost:6379'
}