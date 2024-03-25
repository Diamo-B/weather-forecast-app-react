import { FaWind } from "react-icons/fa6";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { otherStats } from "../RightPanel";

const OtherStats = ({
    windSpeed,
    visibility,
    rain,
    snow,
    humidityRate,
    unixSunrise,
    unixSunset,
}: otherStats) => {
    const [sunrise, setSunrise] = useState<string>("");
    const [sunset, setSunset] = useState<string>("");

    useEffect(() => {
        dayjs.extend(customParseFormat);
        setSunrise(dayjs.unix(unixSunrise).format("HH:mm"));
        setSunset(dayjs.unix(unixSunset).format("HH:mm"));
    }, [unixSunrise, unixSunset]);

    return (
        <div className="grid grid-cols-2 border-2 rounded-lg mx-5 text-white font-bold text-center 2xl:mt-2">
            <div className="border py-5">
                <div className="flex justify-center items-center gap-1">
                    <FaWind className="size-6" />
                    <p>Wind</p>
                </div>
                <p>{windSpeed > 1000 ? Math.floor(windSpeed*3.6)+"Km/h":windSpeed+"m/s"}</p>
            </div>
            <div className="border py-5">
                <div className="flex justify-center items-center gap-1">
                    <MdOutlineVisibility className="size-6" />
                    <p>Visibility</p>
                </div>
                <p>{visibility * 0.001}Km/h</p>
            </div>
            <div className="border py-5 relative">
                {
                    !rain && <div className="absolute h-full w-full top-0 left-0 bg-slate-800/70"></div>
                }
                {snow!==undefined ? (
                    <>
                        <div className="flex justify-center items-center gap-1">
                            <FaRegSnowflake className="size-6" />
                            <p>Snow</p>
                        </div>
                        <p>{snow}mm</p>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center items-center gap-1">
                            <SiRainmeter className="size-6" />
                            <p>Rain</p>
                        </div>
                        <p>{rain? rain: "----"} mm</p>
                    </>
                )}
            </div>
            <div className="border py-5">
                <div className="flex justify-center items-center">
                    <WiHumidity className="size-7" />
                    <p>Humidity</p>
                </div>
                <p>{humidityRate}%</p>
            </div>
            <div className="border py-5">
                <div className="flex justify-center items-center gap-1">
                    <FiSunrise className="size-6" />
                    <p>Sunrise</p>
                </div>
                <p>{sunrise}</p>
            </div>
            <div className="border py-5">
                <div className="flex justify-center items-center gap-1">
                    <FiSunset className="size-6" />
                    <p>Sunset</p>
                </div>
                <p>{sunset}</p>
            </div>
        </div>
    );
};

export default OtherStats;
