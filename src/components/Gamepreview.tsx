import {useEffect, useState, useRef} from "react";
import {API_BASE_URL, API_KEY, API_OPTIONS} from "../App.tsx";
import Loaders2 from "./Loaders2.tsx";


type imageVal = {
    name: string,
    image: string,
    id: number
}

const Gamepreview = ({image, name, id}: imageVal) => {

    const [hover, setHover] = useState(false);
    const [movieData, setMovieData] = useState("");
    const [loadMovie, setLoadMovie] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const fetchVideo = async (dataId: number) => {
        const endpoint = `${API_BASE_URL}/games/${dataId}/movies?key=${API_KEY}`;
        console.log(endpoint);
        setLoadMovie(true)
        await fetch(endpoint, API_OPTIONS)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not fetch movies.");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                const moviesData = data.results;
                const moviesTrailer = []
                for (const movie of moviesData) {
                    moviesTrailer.push(movie.data['480'])
                }

                const randomIndex = Math.floor(Math.random() * moviesTrailer.length);
                const selectedTrailer = moviesTrailer[randomIndex];

                setMovieData(selectedTrailer||"");


            })
            .catch((err) => {
                alert(err.message || "Failed to fetch game from API");
            })
            .finally(() => setLoadMovie(false));


    }
    useEffect(() => {
        if(id !== 0){

        }else{
            setMovieData("")
        }
        const video = videoRef.current;

        if (!video) return;

        if (hover) {
            // Try to play and catch errors
            video.currentTime = 0;
            video.play().catch((e) => {
                // Ignore AbortError caused by fast unhover
                if (e.name !== "AbortError") return
                // console.error("Video play error:", e);
            });
        } else {
            video.pause();
            video.currentTime = 0;
        }

        return () => {
            video.pause();
            video.currentTime = 0;
        };
    }, [hover]);

    useEffect(() => {

        if (id !== 0) {
            fetchVideo(id);
        }else{
            setMovieData("")
        }
        console.log(movieData);

    }, [id]);

    return (
        <>
            <div
                className="relative w-full h-90 overflow-hidden  shadow-lg"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {/* Image */}
                {loadMovie ? (<Loaders2/>) :
                    (<>
                            <img
                                src={image || ""}
                                alt={name + id || "No Name"}
                                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                                    hover && !(movieData === "")  ? "opacity-0" : "opacity-100"
                                }`}
                            />
                            {!(movieData === "") ? (
                                <div className="absolute top-0 left-0 bg-rose-500 text-white text-xs px-2 py-1">
                                    Hover to see trailer
                                </div>
                            ): <div className="absolute top-0 left-0 bg-black/70 text-white text-xs px-2 py-1">
                               No Trailer
                            </div>}
                        </>
                    )}


                {/* Video */}
                <video
                    ref={videoRef}
                    src={movieData}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                        hover && !(movieData === "") ? "opacity-100" : "opacity-0"
                    }`}
                    autoPlay
                    playsInline
                    controls
                    onLoadedMetadata={(e) => {
                        e.currentTarget.volume = 0.50; // Set volume to 25% when metadata is loaded
                    }}
                />
            </div>
            {/*{hover?}*/}
            {/*<img*/}
            {/*    src={image || ""}*/}
            {/*    alt={name+id || "No Name"}*/}
            {/*    className={`w-full object-contain object-top p-8 rounded-t-lg transition-opacity duration-500 ${*/}
            {/*        hover ? "opacity-0" : "opacity-100"*/}
            {/*    }`}*/}
            {/*/>*/}


        </>
    );
};

export default Gamepreview;