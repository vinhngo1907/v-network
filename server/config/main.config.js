const { MONGO_URL, DB_USERNAME, DB_PASSWORD, PORT, DB_NAME } = process.env;

module.exports = {
    port: PORT || 3000,
    mongoURL: MONGO_URL || `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@express-mobile-shop.pzlim.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    env: process.env.NODE_ENV || 'development',
};