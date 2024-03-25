import ForecastItem from "./LeftPanel/forecastItem";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import { useEffect, useState } from "react";
import { currentWeather } from "../App";
import { positionDetails } from "../types/types";
import ForecastItemSkelton from "./LeftPanel/forecastItemSkelton";
import { v4 as uuidv4 } from 'uuid';

type Props = {
    currentWeather: currentWeather;
    positionDetails: positionDetails | undefined;
};

const LeftPanel = ({ currentWeather, positionDetails }: Props) => {
    const [currentDateTime, setCurrentDateTime] = useState<string>("");
    const [forecastData, setforecastData] = useState<any[]>();
    useEffect(() => {
        dayjs.extend(customParseFormat);
        dayjs.extend(weekday);
        setCurrentDateTime(dayjs().format("dddd D MMMM YYYY | HH:mm A"));
    }, []);

    const fetchForecastData = () => {
        if (positionDetails) {
            fetch(
                import.meta.env.VITE_API_FORECAST_WEATHER_URL +
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
                    setforecastData(handleForecastData(response.list));
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };
    useEffect(() => {
        fetchForecastData();
    }, [positionDetails]);

    const handleForecastData = (weatherList:any) => {
        // Object to store aggregated data for each day
        const aggregatedData:any = {};

        // Iterate through the weather objects
        weatherList.forEach((item:any) => {
            // Parse date using dayjs
            const date = dayjs(item.dt_txt, "YYYY-MM-DD HH:mm:ss").format(
                "YYYY-MM-DD"
            );

            // If date not in aggregatedData, initialize it
            if (!aggregatedData[date]) {
                aggregatedData[date] = {
                    feels_like: [],
                    temp_min: [],
                    temp_max: [],
                    weather_main: [],
                };
            }

            // Append values for aggregation
            aggregatedData[date].feels_like.push(item.main.feels_like);
            aggregatedData[date].temp_min.push(item.main.temp_min);
            aggregatedData[date].temp_max.push(item.main.temp_max);
            aggregatedData[date].weather_main.push(item.weather[0].main);
        });

        // Final list to store aggregated data for each day
        const finalList = [];

        // Iterate through aggregatedData
        for (const date in aggregatedData) {
            if (aggregatedData.hasOwnProperty(date)) {
                // Calculate averages
                const feelsLikeAvg =
                    aggregatedData[date].feels_like.reduce(
                        (acc: any, val: any) => acc + val,
                        0
                    ) / aggregatedData[date].feels_like.length;
                const tempMinAvg =
                    aggregatedData[date].temp_min.reduce(
                        (acc: any, val: any) => acc + val,
                        0
                    ) / aggregatedData[date].temp_min.length;
                const tempMaxAvg =
                    aggregatedData[date].temp_max.reduce(
                        (acc: any, val: any) => acc + val,
                        0
                    ) / aggregatedData[date].temp_max.length;

                // Find the most common weather condition
                const mostCommonWeather = aggregatedData[
                    date
                ].weather_main.reduce((acc: any, val: any) => {
                    acc[val] = (acc[val] || 0) + 1;
                    return acc;
                }, {});

                const mostCommonWeatherKey = Object.keys(
                    mostCommonWeather
                ).reduce((a, b) =>
                    mostCommonWeather[a] > mostCommonWeather[b] ? a : b
                );

                // Get the weekday name
                const weekdayName = dayjs(date).format("dddd");

                // Create a new object for the day's aggregated data
                const dayAggregatedData = {
                    date: date,
                    weekday: weekdayName,
                    feels_like_avg: parseFloat(feelsLikeAvg.toFixed(2)),
                    temp_min_avg: parseFloat(tempMinAvg.toFixed(2)),
                    temp_max_avg: parseFloat(tempMaxAvg.toFixed(2)),
                    most_common_weather: mostCommonWeatherKey,
                };

                // Append to the final list
                finalList.push(dayAggregatedData);
            }
        }

        return finalList.slice(1);;
    };

    return (
        <section className="col-span-3 flex flex-col">
            {/* top side */}
            <div className="h-4/6 2xl:h-5/6 p-12 flex flex-col justify-between">
                <h2 className="font-bold text-xl text-right text-white">
                    {currentDateTime}
                </h2>
                {currentWeather ? (
                    <h1 className="font-medium text-7xl text-right text-white capitalize underline">
                        {currentWeather.description}
                    </h1>
                ) : (
                    <div className="flex justify-end">
                        <div className="skeleton h-10 w-2/3 bg-slate-700/70"></div>
                    </div>
                )}
            </div>
            {/* Forecast cards panel */}
            <div className="flex-1 border-4 bg-slate-500/40 border-white mx-5 mb-5 p-5 rounded-xl flex justify-evenly">
                {
                   forecastData && forecastData.length > 0 ?
                        forecastData.map((item:any)=>(
                            <ForecastItem key={uuidv4()} item={item}/>
                        ))
                    :
                    <>
                        <ForecastItemSkelton/>
                        <ForecastItemSkelton/>
                        <ForecastItemSkelton/>
                        <ForecastItemSkelton/>
                        <ForecastItemSkelton/>
                    </>
                }
            </div>
        </section>
    );
};

export default LeftPanel;
