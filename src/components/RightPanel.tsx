import MainStats from "./RightPanel/MainStats";
import OtherStats from "./RightPanel/OtherStats";
import LocationInput from "./RightPanel/LocationInput";
import { mainWeatherData, positionDetails } from "../types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WeatherDescription } from "../App";

type Props = {
    positionDetails: positionDetails;
    setCurrentWeatherDescription: Dispatch<SetStateAction<WeatherDescription|null>>
};

type weatherData = {
    main: mainWeatherData,  
    windSpeed: number,
    visibilityRange: number,
    rainPrecipitation: number | undefined,
    rainDataAvailabilityStatus: string | undefined,
    snowPrecipitation: number | undefined,
    snowDataAvailabilityStatus: string | undefined,
    humidityRate: number,
    sunriseUnixTime: number,
    sunsetUnixTime: number
}

const RightPanel = ({ positionDetails, setCurrentWeatherDescription }: Props) => {
    const [weatherData, setWeatherData] = useState<weatherData | null>(null)

    useEffect(() => {
        const fetchWeatherData = () => {
            if (positionDetails) {
                fetch(
                    import.meta.env.VITE_API_CURRENT_WEATHER_URL +
                    "?q=" +
                    positionDetails?.city +
                    "," +
                    positionDetails?.country.code +
                    "&units=metric&APPID=" +
                    import.meta.env.VITE_API_KEY,
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then(async (data) => {
                        const response = await data.json();
                        setWeatherData({
                            main:{
                                feelsLike: response.main.feels_like,
                                highest: response.main.temp_max,
                                lowest: response.main.temp_min
                            },
                            windSpeed: response.wind.speed,
                            visibilityRange: response.visibility,
                            rainPrecipitation: response.rain?.['1h'] || response.rain?.['3h'] || undefined,
                            rainDataAvailabilityStatus: response.rain?.['1h'] !== undefined ? '1h' : response.rain?.['3h'] !== undefined ? '3h' : undefined,
                            snowPrecipitation: response.snow?.['1h'] || response.snow?.['3h'] || undefined,
                            snowDataAvailabilityStatus: response?.snow?.['1h'] !== undefined ? '1h' : response?.snow?.['3h'] !== undefined ? '3h' : undefined,
                            humidityRate: response.main.humidity,
                            sunriseUnixTime: response.sys.sunrise,
                            sunsetUnixTime: response.sys.sunset
                        })
                        setCurrentWeatherDescription({ name: response.weather[0].main, description: response.weather[0].description });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        };

        fetchWeatherData();
    }, [positionDetails]);

    return (
        <section className="w-full flex flex-col justify-center 2xl:my-5">
            <div className="h-fit 2xl:h-full 2xl:flex 2xl:flex-col w-full mr-5 rounded-lg bg-slate-500/40 border-4 py-5 ">
                {
                    positionDetails && weatherData ?
                        <>
                            {/* Input */}
                            <LocationInput />
                            <MainStats
                                feelsLike={weatherData.main.feelsLike}
                                lowest={weatherData.main.lowest}
                                highest={weatherData.main.highest}
                                location={positionDetails.locality}
                                city={positionDetails.city}
                                country={{
                                    code: positionDetails.country.code,
                                    name: positionDetails.country.name,
                                }}
                            />
                            {/* Divider */}
                            <div className="border-2 w-[90%] mx-auto my-5"></div>
                            {/* wind / visibility / rain|snow / humidity / sunset / sunrise */}
                            <OtherStats
                                windSpeed={weatherData.windSpeed}
                                visibility={weatherData.visibilityRange}
                                rain={weatherData.rainPrecipitation}
                                rainInterval={weatherData.rainDataAvailabilityStatus}
                                snow={weatherData.snowPrecipitation}
                                snowInterval={weatherData.snowDataAvailabilityStatus}
                                humidityRate={weatherData.humidityRate}
                                unixSunrise={weatherData.sunriseUnixTime}
                                unixSunset={weatherData.sunsetUnixTime}
                            />
                        </>
                        :
                        ""
                }
            </div>
        </section>
    );
};

export default RightPanel;
