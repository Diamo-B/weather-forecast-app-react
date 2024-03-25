import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { TiWeatherCloudy } from "react-icons/ti";
import { Country } from "../../types/types";

type Props = {
    feelsLike: number;
    lowest: number;
    highest: number;
    location: string;
    city:string;
    country: Country
}

const MainStats = ({feelsLike, lowest, highest, city, country, location}:Props) => {
    return (
      <>
        <h1 className="font-bold text-center text-2xl text-white mt-5">{location}</h1>
        <h2 className="font-bold text-center text-lg text-white mt-2">{city},{country.name}</h2>
        <div>
          <TiWeatherCloudy className="size-28 text-white mx-auto" />
          <p className="font-bold text-white text-4xl text-center">
            {feelsLike}℃
          </p>
        </div>
        <div className="mx-12 flex justify-between">
          <div className="text-xl font-bold text-white">
            <FaTemperatureArrowDown className="size-12 text-white mx-auto" />
            <p>{lowest}℃</p>
          </div>
          <div>
            <TiWeatherCloudy className="size-24 text-white mx-auto" />
            <p className="font-bold text-white text-3xl text-center">
              {feelsLike}℃
            </p>
          </div>
          <div className="text-xl font-bold text-white">
            <FaTemperatureArrowUp className="size-12 text-white mx-auto" />
            <p>{highest}℃</p>
          </div>
        </div>
      </>
    );
}
 
export default MainStats;