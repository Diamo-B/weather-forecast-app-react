import MainStats from "./RightPanel/MainStats";
import OtherStats from "./RightPanel/OtherStats";
import LocationInput from "./RightPanel/LocationInput";

const RightPanel = () => {
  return (
    <section className="w-full flex flex-col justify-center 2xl:my-5">
      <div className="h-fit 2xl:h-full 2xl:flex 2xl:flex-col w-full mr-5 rounded-lg bg-slate-500/40 border-2 py-10 ">
        {/* Input */}
        <LocationInput/>
        <MainStats feelsLike={12} lowest={8} highest={18} />
        {/* Divider */}
        <div className="border-2 w-[90%] mx-auto my-5"></div>
        {/* wind / humidity / sunset / sunrise */}
        <OtherStats
          windSpeed={8}
          humidityRate={80}
          unixSunrise={1710916239}
          unixSunset={1710959926}
        />
        {/* Renders only on big screens (min-w = 1536) */}
        {/* Divider */}
        <div className="hidden 2xl:block border-2 w-[90%] mx-auto my-5"></div>
        {/* temp graph */}
        <div className="hidden 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:flex-1">
          <h1 className="text-2xl text-white">Comming soon</h1>
        </div>
      </div>
    </section>
  );
};

export default RightPanel;
