export type Coordinates = {
    longitude: number;
    latitude: number;
};

export type positionDetails = {
    city: string;
    country: Country;
    locality: string;
<<<<<<< HEAD
    lat: number,
    lon:number
=======
>>>>>>> e5be4804a6225b8360339cd6717db8cc28f51bd9
};

export type Country = {
    name: string;
    code: string;
};
<<<<<<< HEAD
=======


//======================================

export type mainWeatherData = {
    feelsLike: number;
    lowest: number;
    highest: number;
};

// Define types for ForecastWeatherData
export type ForecastWeatherData = {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    };
    dt_txt: string;
};

// Define types for calculating averages
export type AverageCalcPrep = {
    count: number;
    sum_temp_min: number;
    sum_temp_max: number;
};

// Define types for the forecast weather with averages
export type ForecastWeather_Calc = {
    [day: string]: AverageCalcPrep;
}

export type ForecastWeather = {
    [day: string]: {
        temp_min_avg: number;
        temp_max_avg: number;
    };
};
>>>>>>> e5be4804a6225b8360339cd6717db8cc28f51bd9
