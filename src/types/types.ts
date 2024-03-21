export type Coordinates = {
    longitude: number;
    latitude: number;
};

export type positionDetails = {
    city: string;
    country: Country;
    locality: string;
};

export type Country = {
    name: string;
    code: string;
};
