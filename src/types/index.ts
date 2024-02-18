export interface RedisConfig {
    host: string;
    port: number;
    password: string;
    db: number;
    ex: number;
}

export interface MongoConfig {
    uri: string; // MongoDB connection URI
    // Add more MongoDB configuration properties as needed
}

export interface HeaderConfig {

}