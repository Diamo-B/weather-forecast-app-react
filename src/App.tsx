import RightPanel from "./components/RightPanel";
import LeftPanel from "./components/LeftPanel";
import { useEffect, useState } from "react";
import { Coordinates, positionDetails } from "./types/types";


export type WeatherDescription = {
    name:string;
    description:string;
}

function App() {
    const [positionCoordinates, setPositionCoordinates] = useState<
        Coordinates | undefined
    >(undefined);
    const [currentWeatherDescription, setCurrentWeatherDescription] = useState<WeatherDescription|null>(null)
    const [positionDetails, setPositionDetails] = useState<positionDetails>();
    const [error, setError] = useState<string | null>(null);
    /* const [loading] */
    useEffect(() => {
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
        //* coordinates fetched successfully
    }, []);


    useEffect(() => {
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
                        });

                        return response;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
        fetchPositionData();
    }, [positionCoordinates]);

    // todo: make a pop-up for activating the localization functionality of the browser

    return (
        <div
            className="w-full h-full max-h-dvh overflow-hidden bg-auto 2xl:bg-cover bg-no-repeat bg-center flex flex-col"
            style={{ backgroundImage: "url('/stormy 2.jpg')" }}
        >
            {
                positionDetails ?

                <div className="w-full h-full grid grid-cols-4 pr-5">
                        <LeftPanel positionDetails={positionDetails} currentWeatherDescription={currentWeatherDescription}/>
                        <RightPanel positionDetails={positionDetails} setCurrentWeatherDescription={setCurrentWeatherDescription}/>
                </div>
                :
                ''
            }
        </div>
    );
}

export default App;
