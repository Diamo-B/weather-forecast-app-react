const ForecastItemSkelton = () => {
    return (
        <div className="border border-white rounded-xl grid grid-cols-1 gap-1 place-content-center 2xl:py-5 2xl:px-5 text-white">
            <div className="skeleton h-4 w-10 mx-auto"></div>
            <div className="skeleton size-16 mx-auto"></div>
            <div className="flex justify-evenly gap-5 font-bold mx-3">
                <div className="flex flex-col justify-center items-center">
                    <div className="skeleton size-6"></div>
                    <div className="skeleton h-4 w-10 mx-auto"></div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="skeleton size-6"></div>
                    <div className="skeleton h-4 w-10 mx-auto"></div>
                </div>
            </div>
        </div>
    );
};

export default ForecastItemSkelton;
