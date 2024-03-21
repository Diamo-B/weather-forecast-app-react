import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { TiWeatherCloudy } from "react-icons/ti";

const ForecastItem = () => {
  return (
    <div className="border border-white rounded-xl grid grid-cols-1 place-content-center 2xl:py-5 2xl:px-5 text-white">
      <h1 className="text-center font-bold ">Thu</h1>
      <TiWeatherCloudy className="size-16 mx-auto" />
      <div className="flex justify-evenly gap-5 font-bold mx-3">
        <div>
          <FaTemperatureArrowDown className="size-6 mx-auto" />
          <p>13℃</p>
        </div>
        <div>
          <FaTemperatureArrowUp className="size-6 mx-auto" />
          <p>18℃</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastItem;
