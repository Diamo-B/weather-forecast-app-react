import ForecastItem from "./forecastItem";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";

const LeftPanel = () => {
    const [currentDateTime, setCurrentDateTime] = useState<string>("");
    useEffect(() => {
        dayjs.extend(customParseFormat);
        setCurrentDateTime(dayjs().format("dddd D MMMM YYYY | HH:mm A"));
    }, []);
    return (
        <section className="col-span-3 flex flex-col">
            {/* top side */}
            <div className="h-4/6 2xl:h-5/6 p-10 flex flex-col justify-between">
                <h2 className="font-bold text-xl text-right text-white">
                    {currentDateTime}
                </h2>
                <h1 className="font-medium text-7xl text-right text-white capitalize underline">
                    scattered clouds
                </h1>
            </div>
            {/* Forecast cards panel */}
            <div className="flex-1 border-4 border-white mx-5 mb-5 p-5 rounded-xl flex justify-evenly">
                <ForecastItem />
                <ForecastItem />
                <ForecastItem />
                <ForecastItem />
                <ForecastItem />
            </div>
        </section>
    );
};

export default LeftPanel;
