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

export interface InfluxConfig {
    url: string;
    org: string;
    token: string;
    bucket: string;
}

export interface HeaderConfig {

}

export type JsonObject = { [key: string]: any }

export type IResponse = { statusCode: number, message: string }

export type RoomId = { type: string, id: string }

export type Activies = {
    type: string // 'all' | 'group' | 'channel' | 'e2e'
}

export type IFile = {
    size: number,
    buffer: ArrayBuffer,
    name: string
}

export type TUserDeviceInfo = {
    ip: string,
    id?: string,
    name: string,
    location: string
}

export type HasOwner = 0 | 1;
