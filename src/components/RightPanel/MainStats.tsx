import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { TiWeatherCloudy } from "react-icons/ti";

type Props = {
    feelsLike: number;
    lowest: number;
    highest: number;
}

const MainStats = ({feelsLike, lowest, highest}:Props) => {
    return (
      <>
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
          <div className="text-xl font-bold text-white">
            <FaTemperatureArrowUp className="size-12 text-white mx-auto" />
            <p>{highest}℃</p>
          </div>
        </div>
      </>
    );
}
 
export default MainStats;