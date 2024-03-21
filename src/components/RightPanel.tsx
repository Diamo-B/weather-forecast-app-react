import MainStats from "./RightPanel/MainStats";
import OtherStats from "./RightPanel/OtherStats";
import LocationInput from "./RightPanel/LocationInput";
import { positionDetails } from "../types/types";
import { useEffect, useState } from "react";

type Props = {
    positionDetails: positionDetails;
};

type mainData = {
    feelsLike: number,
    lowest:number,
    highest: number
}

const RightPanel = ({ positionDetails }: Props) => {
    const [mainData, setMainData] = useState<mainData|null>(null)
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
                    console.log(response);
                    setMainData({
                        feelsLike: response.main.feels_like,
                        highest: response.main.temp_max,
                        lowest: response.main.temp_min 
                    })
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
        <section className="w-full flex flex-col justify-center 2xl:my-5">
            <div className="h-fit 2xl:h-full 2xl:flex 2xl:flex-col w-full mr-5 rounded-lg bg-slate-500/40 border-2 py-5 ">
                {/* Input */}
                <LocationInput />
               {
                positionDetails && mainData?
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
                :
                ""
                }
                {/* Divider */}
                <div className="border-2 w-[90%] mx-auto my-2"></div>
                {/* wind / visibility / rain|snow / humidity / sunset / sunrise */}
                <OtherStats
                    windSpeed={8}
                    visibility={10000}
                    rain={3}
                    snow={undefined}
                    humidityRate={80}
                    unixSunrise={1710916239}
                    unixSunset={1710959926}
                />
            </div>
        </section>
    );
};

export default RightPanel;
