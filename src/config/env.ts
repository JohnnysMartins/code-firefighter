export default {
  server_port: process.env.PORT || 3000,
  mongodb_url: process.env.MONGO_URL || 'localhost:27017',
  mongodb_database_name: process.env.MONGO_DB || 'firefighter'
}