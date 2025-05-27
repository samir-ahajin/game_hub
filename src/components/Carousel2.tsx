// @ts-nocheck
import {useEffect, useState} from "react";
import {API_BASE_URL,API_KEY,API_OPTIONS} from '../App.tsx';

type Feature = {
    id: string;
    name: string;
    background_image: string;
    image: string;
    description: string;
};

type CarouselProps = {
    features: Feature[];
};




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
    const fecthGameData = async(game?:string)=>{

        try{
            const endpoint = `${API_BASE_URL}/games/${game}?key=${API_KEY}`
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Could not fetch games.");
            }
            const data = await response.json();

             setGameData(data || {});
        }
        catch(err){

            alert(err.message || 'Failed to fetch game from API');
        }
    }





    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Left: Image */}
                {current?.background_image && (
                    <div className="relative w-full md:w-1/2 perspective">
                        {/* Shadowed duplicate */}
                        <img
                            src={current.background_image}
                            alt={current.name || "Game Image"}
                            className="absolute top-2 left-2 w-full h-full object-cover  opacity-20 blur-sm scale-105 z-0"
                        />

                        {/* Rotated Image */}
                        <img
                            src={current.background_image}
                            alt={current.name || "Game Image"}
                            className="relative z-10 w-full h-full max-h-64 object-cover  ring-2 white; shadow-3xl/30  transform-style preserve-3d custom-rotate-y"
                        />
                    </div>
                )}

                {/* Right: Details + Arrows */}
                <div className="md:w-1/2 w-full ">
                    <div className=" h-64 bg-black rounded-xl relative flex flex-col justify-between shadow-lg ">
                        {/* Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-700/60 hover:bg-gray-950/70 rounded-full p-3 shadow-md z-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={5}
                                className="w-6 h-6 text-green-400"
                            >
                                <path strokeLinecap="butt" strokeLinejoin="miter" d="M16 4l-8 8 8 8" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-700/30 hover:bg-gray-950/70 rounded-full p-3 shadow-md z-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={5}
                                className="w-6 h-6 text-green-400"
                            >
                                <path strokeLinecap="butt" strokeLinejoin="miter" d="M8 4l8 8-8 8" />
                            </svg>
                        </button>

                        {/* Text Content */}
                        <div className="p-4 text-white flex-grow flex flex-col justify-between ">
                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold">{current.name || "No Name"}</h2>
                                    <h2 className="text-sm opacity-60">{index + 1}/{features.length}</h2>
                                </div>
                                {gameData && (
                                    <p
                                        dangerouslySetInnerHTML={{ __html: gameData.description }}
                                        className="text-gray-400 mt-2 overflow-y-auto max-h-48 pr-2"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {features.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full cursor-pointer ${
                            index === i ? "bg-green-400" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel2;