import RightPanel from "./components/RightPanel";
import LeftPanel from "./components/LeftPanel";
import { useEffect, useState } from "react";
import { Coordinates, positionDetails } from "./types/types";
<<<<<<< HEAD
import Loading from "./Loading";
import LocalizationError from "./LocalizationError";
import { WeatherCondition } from "./Enums/WeatherEnum";

export type currentWeather = {
    id: number,
    description: string,
    condition: WeatherCondition,
}|undefined

=======


export type WeatherDescription = {
    name:string;
    description:string;
}
>>>>>>> e5be4804a6225b8360339cd6717db8cc28f51bd9

function App() {
    const [positionCoordinates, setPositionCoordinates] = useState<
        Coordinates | undefined
    >(undefined);
<<<<<<< HEAD
    const [positionDetails, setPositionDetails] = useState<positionDetails>();
    const [error, setError] = useState<string | null>(null);
    const [loading, isLoading] = useState<boolean>(true);
    const [currentWeather, setCurrentWeather] = useState<currentWeather>();
    const [backgroundImage, setBackgroundImage] = useState<string>("")

    useEffect(() => {
        browserPositionRetrievalTrigger();
        const time = setTimeout(() => {
            isLoading(false);
            clearTimeout(time);
        }, 500);
    }, []);

    const browserPositionRetrievalTrigger = (): void => {
=======
    const [currentWeatherDescription, setCurrentWeatherDescription] = useState<WeatherDescription|null>(null)
    const [positionDetails, setPositionDetails] = useState<positionDetails>();
    const [error, setError] = useState<string | null>(null);
    /* const [loading] */
    useEffect(() => {
>>>>>>> e5be4804a6225b8360339cd6717db8cc28f51bd9
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    setPositionCoordinates(position.coords);
                },
                (error) => {
                    setError(error.message);
                    return;
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
            return;
        }
    };

    const fetchPositionData = () => {
        if (positionCoordinates) {
            fetch(
                "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
                    positionCoordinates.latitude +
                    "&longitude=" +
                    positionCoordinates.longitude,
                {
                    method: "get",
                }
            )
                .then(async (data) => {
                    const response = await data.json();
                    setPositionDetails({
                        city: response.city,
                        country: {
                            name: response.countryName,
                            code: response.countryCode,
                        },
                        locality: response.locality,
                        lat: positionCoordinates.latitude,
                        lon: positionCoordinates.longitude,
                    });

                    return response;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        const time = setTimeout(() => {
            fetchPositionData();
            clearTimeout(time);
        }, 500);
    }, [positionCoordinates]);
    

    useEffect(()=>{
        if(currentWeather){
            const type:number = Math.floor(currentWeather.id /100);
            console.log(type);
            
            switch(type){
                case 2:
                    setBackgroundImage("stormy.jpg")
                break;
                case 3:
                    setBackgroundImage("drizzle.jpg")
                break;
                case 5:
                    setBackgroundImage("heavyRain.jpg")
                break;
                case 6:
                    setBackgroundImage("snow.jpg")
                break;
                case 7:
                    setBackgroundImage("fog.jpg")
                break;
                case 8:
                    setBackgroundImage(currentWeather.id == 800 ?"clear.jpg":"cloudy.jpg")
                break;
            }
        }
    },[currentWeather])

    return (
        <div
            className="w-full h-full max-h-dvh overflow-hidden bg-auto 2xl:bg-cover bg-no-repeat bg-center flex flex-col"
            style={{ backgroundImage: `url('/${backgroundImage}')` }}
        >
            {loading ? (
                <div className="bg-slate-800/70 w-full h-full">
                    <Loading/>
                </div>
            ) : error ? (
                <LocalizationError/>
            ) : (
                <div className="w-full h-full grid grid-cols-4 pr-5">
                    <LeftPanel  positionDetails={positionDetails} currentWeather={currentWeather}/>
                    <RightPanel positionDetails={positionDetails} setCurrentWeather={setCurrentWeather}/>
                </div>
            )}
        </div>
    );
}

export default App;
