const LocalizationError = () => {
    return (
        <section className="w-full h-full flex justify-center items-center">
            <div className="card w-1/2 bg-neutral text-neutral-content">
                <div className="card-body">
                    <h2 className="card-title">
                        We could not determine your location
                    </h2>
                    <p>We recommend to follow these steps:</p>
                    <div className="px-3">
                        <ul className="list-outside list-decimal">
                            <li>
                                Go into your system's settings, and activate the
                                localization detection functionality
                            </li>
                            <li>
                                Give the browser the ability to access your
                                current position (it is generally in the format
                                of a button somewhere on the search bar, or you
                                can modify it via the browser's settings)
                            </li>
                        </ul>
                    </div>
                    <div className="card-actions justify-end">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocalizationError;
