import ForecastItem from "./forecastItem";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { ForecastWeather, ForecastWeatherData, ForecastWeather_Calc, positionDetails } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { WeatherDescription } from "../App";

type Props = {
    positionDetails: positionDetails,
    currentWeatherDescription: WeatherDescription|null
}

const LeftPanel = ({ positionDetails, currentWeatherDescription }: Props) => {
    const [currentDateTime, setCurrentDateTime] = useState<string>("");
    const [forecastData, setForecastData] = useState<ForecastWeather | null>(null);
    const [daysOrder, setDaysOrder] = useState<string[]>([]);

    useEffect(() => {
        dayjs.extend(customParseFormat);
        setCurrentDateTime(dayjs().format("dddd D MMMM YYYY | HH:mm"));
    }, []);

    const filterUsefulForecastData = (list: ForecastWeatherData[]) => {
        const groupedData: ForecastWeather_Calc = {};

        list.forEach(entry => {
            const weekday = dayjs.unix(entry.dt).format('dddd'); // Convert dt to weekday name
            if (!groupedData[weekday]) {
                groupedData[weekday] = {
                    count: 0,
                    sum_temp_min: 0,
                    sum_temp_max: 0,
                };
            }
            groupedData[weekday].count++;
            groupedData[weekday].sum_temp_min += entry.main.temp_min;
            groupedData[weekday].sum_temp_max += entry.main.temp_max;
        });

        const averages = Object.keys(groupedData).reduce((data: ForecastWeather, day: string): ForecastWeather => {
            data[day] = {
                temp_min_avg: parseFloat((groupedData[day].sum_temp_min / groupedData[day].count).toFixed(2)),
                temp_max_avg: parseFloat((groupedData[day].sum_temp_max / groupedData[day].count).toFixed(2)),
            };
            return data;
        }, {});

        setForecastData(averages);
    }



    useEffect(() => {
        setForecastData(null)
        const fetchForecastData = () => {
            if (positionDetails) {
                fetch(
                    import.meta.env.VITE_API_FORECAST_WEATHER_URL +
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
                            credentials: 'include'
                        },
                    }
                )
                    .then(async (data) => {
                        const response = await data.json();
                        filterUsefulForecastData(response.list)
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        };
        fetchForecastData();
    }, [positionDetails])




    useEffect(() => {
        setDaysOrder([]);
        const todayIndex = dayjs().day();
        for (let i = 1; i < 6; i++) {
            const nextDayIndex = (todayIndex + i) % 7; // Calculate the index for the next day
            setDaysOrder(prev => [...prev, dayjs().day(nextDayIndex).format('dddd')]) // Add the formatted day name to the array
        }
    }, [])


    return (
        <section className="col-span-3 flex flex-col">
            {/* top side */}
            <div className="h-4/6 2xl:h-5/6 p-12 flex flex-col justify-between">
                <h2 className="font-bold text-xl text-right text-white">
                    {currentDateTime}
                </h2>
                <h1 className="font-medium text-7xl text-right text-white capitalize underline">
                    {currentWeatherDescription ?currentWeatherDescription.description:""}
                </h1>
            </div>
            {/* Forecast cards panel */}
            <div className="flex-1 border-4 bg-slate-500/40 border-white mx-5 mb-2 p-5 rounded-xl flex justify-evenly">
                {
                    (forecastData && daysOrder) ? (
                        daysOrder.map((day: string) => (
                            <ForecastItem day={day} highest={forecastData[day].temp_max_avg} lowest={forecastData[day].temp_min_avg} key={uuidv4()} />
                        ))
                    ) : (
                        <p>Loading forecast...</p> // Display a loading message
                    )
                }

            </div>
        </section>
    );
};

export default LeftPanel;
