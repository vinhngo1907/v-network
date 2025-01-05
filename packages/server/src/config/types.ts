type JWT_CONFIG = {
    secret: string;
    signOptions: {
        expiresIn: string;
    }
}

type SeedingOptions = {
    seeds: string[];
    factories: string[];
}