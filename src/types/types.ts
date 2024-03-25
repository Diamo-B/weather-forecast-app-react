export type Coordinates = {
    longitude: number;
    latitude: number;
};

export type positionDetails = {
    city: string;
    country: Country;
    locality: string;
    lat: number,
    lon:number
};

export type Country = {
    name: string;
    code: string;
};
