import MainStats from "./RightPanel/MainStats";
import OtherStats from "./RightPanel/OtherStats";
import LocationInput from "./RightPanel/LocationInput";
import { positionDetails } from "../types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loading from "../Loading";
import { currentWeather } from "../App";

type Props = {
    positionDetails: positionDetails | undefined;
    setCurrentWeather: Dispatch<SetStateAction<currentWeather>>
};

type mainData = {
    feelsLike: number;
    lowest: number;
    highest: number;
};

export type otherStats = {
    windSpeed: number;
    visibility: number;
    rain: number | undefined;
    snow: number | undefined;
    humidityRate: number;
    unixSunrise: number;
    unixSunset: number;
};

const RightPanel = ({ positionDetails, setCurrentWeather }: Props) => {
    const [mainData, setMainData] = useState<mainData | null>(null);
    const [otherStats, setOtherStats] = useState<otherStats | null>(null);
    
    const fetchWeatherData = () => {
        if (positionDetails) {
            fetch(
                import.meta.env.VITE_API_CURRENT_WEATHER_URL +
                    "?lat=" +
                    positionDetails?.lat +
                    "&lon=" +
                    positionDetails?.lon +
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
                    console.log("light",response);
                    setMainData({
                        feelsLike: response.main.feels_like,
                        highest: response.main.temp_max,
                        lowest: response.main.temp_min,
                    });
                    setOtherStats({
                        windSpeed: response.wind.speed,
                        humidityRate: response.main.humidity,
                        visibility: response.visibility,
                        rain: response.rain
                            ? response.rain["1h" || "3h"]
                            : undefined,
                        snow: response.snow
                            ? response.rain["1h" || "3h"]
                            : undefined,
                        unixSunrise: response.sys.sunrise,
                        unixSunset: response.sys.sunset,
                    });
                    setCurrentWeather({id:response.weather[0].id,condition:response.weather[0].main,description:response.weather[0].description})
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };


    useEffect(() => {
        fetchWeatherData();
    }, [positionDetails]);

    return (
        <section className="w-full flex flex-col justify-center 2xl:my-5 relative">
            <div className="h-fit 2xl:h-full 2xl:flex 2xl:flex-col w-full mr-5 rounded-lg bg-slate-500/40 border-2 py-5 ">
                {positionDetails ? (
                    <>
                        {positionDetails && mainData ? (
                            <>
                                <LocationInput />
                                <MainStats
                                    feelsLike={mainData?.feelsLike}
                                    lowest={mainData?.lowest}
                                    highest={mainData?.highest}
                                    location={positionDetails.locality}
                                    city={positionDetails.city}
                                    country={{
                                        code: positionDetails.country.code,
                                        name: positionDetails.country.name,
                                    }}
                                />
                            </>
                        ) : (
                            ""
                        )}

                        {otherStats && (
                            <>
                                <div className="border-2 w-[90%] mx-auto my-2"></div>
                                <OtherStats
                                    windSpeed={otherStats!.windSpeed}
                                    visibility={otherStats!.visibility}
                                    rain={otherStats!.rain}
                                    snow={otherStats!.snow}
                                    humidityRate={otherStats!.humidityRate}
                                    unixSunrise={otherStats!.unixSunrise}
                                    unixSunset={otherStats!.unixSunset}
                                />
                            </>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </section>
    );
};

export default RightPanel;
