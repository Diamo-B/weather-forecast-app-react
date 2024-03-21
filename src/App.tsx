import RightPanel from "./components/RightPanel";
import LeftPanel from "./components/LeftPanel";
import { useEffect, useState } from "react";
import { Coordinates, positionDetails } from "./types/types";


function App() {
    const [positionCoordinates, setPositionCoordinates] = useState<
        Coordinates | undefined
    >(undefined);
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
   
    const fetchForecastData = () => {
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
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };
    useEffect(() => {
        fetchPositionData();
    }, [positionCoordinates]);
    /* useEffect(() => {
        fetchForecastData();
    }, [positionDetails]); */
    // todo: make a pop-up for activating the localization functionality of the browser

    return (
        <div
            className="w-full h-full max-h-dvh overflow-hidden bg-auto 2xl:bg-cover bg-no-repeat bg-center flex flex-col"
            style={{ backgroundImage: "url('/stormy 2.jpg')" }}
        >
          {
            positionDetails &&

            <div className="w-full h-full grid grid-cols-4 pr-5">
                <LeftPanel />
                <RightPanel positionDetails={positionDetails}/>
            </div>
          }
        </div>
    );
}

export default App;
