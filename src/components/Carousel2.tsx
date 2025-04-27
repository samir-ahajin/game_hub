import {useEffect, useState} from "react";

type Feature = {
    id: string;
    name: string;
    background_image: string;
    image: string;
};

type CarouselProps = {
    features: Feature[];
};
const API_BASE_URL = "https://api.rawg.io/api"
const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const API_OPTIONS = {
    method: "GET",
    accept: 'application/json',
    authorization: `Bearer ${API_KEY}`,
}



const Carousel2 = ({features}: CarouselProps) => {
    const [index, setIndex] = useState(0);
    const [gameData, setGameData] = useState({});


    // Autoplay every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % features.length);
        }, 10000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [features.length]);

// Log feature change when index updates
    useEffect(() => {
        const data =features[index];
        if (data) {
            fecthGameData(data.id);  // Log the data only if it's defined
        }
    }, [index, features]);



    if (!features || features.length === 0) return null;

    const current = features[index];

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + features.length) % features.length);
    };

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % features.length);
    };
    const fecthGameData = async(game)=>{

        try{
            const endpoint = `${API_BASE_URL}/games/${game}?key=${API_KEY}`
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Could not fetch games.");
            }
            const data = await response.json();

            setGameData(data || {})
        }
        catch(err){
            // @ts-ignore
            alert(err.message || 'Failed to fetch game from API');
        }
    }





    return (

                    <div className="w-full max-w-6/10 h-10/10 mx-auto p-4">
                        <div className="relative">
                            <div className="overflow-hidden shadow-lg bg-black rounded-xl">
                                {/* Image container */}
                                {current?.background_image && (
                                    <img
                                        src={current.background_image}
                                        alt={current.name || "Game Image"}
                                        className="w-full h-32 object-cover"
                                    />
                                )}

                                {/* Buttons positioned only on the image */}
                                <button
                                    onClick={() => prevSlide()}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-700/60 hover:bg-gray-950/70 rounded-full p-3 shadow-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={5}
                                        className="w-10 h-10 text-green-400"
                                    >
                                        <path strokeLinecap="butt" strokeLinejoin="miter" d="M16 4l-8 8 8 8" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => nextSlide()}
                                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-700/30 hover:bg-gray-950/70 rounded-full p-3 shadow-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={5}
                                        className="w-10 h-10 text-green-400"
                                    >
                                        <path strokeLinecap="butt" strokeLinejoin="miter" d="M8 4l8 8-8 8" />
                                    </svg>
                                </button>

                                {/* Content below the image */}
                                <div className="p-4 text-white">
                                    <div>
                                    <h2 className="text-xl font-bold">{current.name || "No Name"}</h2><h2>{index+1}/{features.length}</h2>
                                    </div>
                                    {/* Use dangerouslySetInnerHTML to render HTML description */}
                                    {gameData.description && (
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: gameData.description,
                                            }}
                                            className="text-gray-500 line-clamp-4"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {features.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 sm:w-2 sm:h-2  rounded-full cursor-pointer ${
                            index === i ? "bg-green-400" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel2;