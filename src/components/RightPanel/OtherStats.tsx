import { FaWind } from "react-icons/fa6";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";

type Props = {
  windSpeed: number;
  humidityRate: number;
  unixSunrise: number;
  unixSunset: number;
};
const OtherStats = ({
  windSpeed,
  humidityRate,
  unixSunrise,
  unixSunset,
}: Props) => {
  const [sunrise, setSunrise] = useState<string>("");
  const [sunset, setSunset] = useState<string>("");
  
  useEffect(()=>{
    dayjs.extend(customParseFormat);
    setSunrise(dayjs.unix(unixSunrise).format("HH:mm"));
    setSunset(dayjs.unix(unixSunset).format("HH:mm"));
  },[unixSunrise, unixSunset])

  return (
      <div className="grid grid-cols-2 border-2 rounded-lg mx-5 text-white font-bold text-center mt-10 2xl:mt-2">
          <div className="border py-5">
              <div className="flex justify-center items-center gap-1">
                  <FaWind className="size-6" />
                  <p>Wind</p>
              </div>
              <p>{windSpeed}Km/h</p>
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
