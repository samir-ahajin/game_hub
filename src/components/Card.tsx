
import {API_BASE_URL,API_KEY,API_OPTIONS} from '../App.tsx';
import React, {useEffect, useState} from "react";
import ToastModal from "./ToastModal.tsx";
import {useOutletContext} from "react-router";


type Game = {
    id: number;
    name: string;
    description: string;
    rating: number;
};

type CardContextType = {
    gameDetails: Game;
    emailCart: string;
    setEmailCart: React.Dispatch<React.SetStateAction<string>>;
};

const Card = () => {
    const { gameDetails,emailCart, setEmailCart } = useOutletContext<CardContextType>();
    const [gameCardInfo, setGameCardInfo] = useState({});

    const [showToast, setShowToast] = useState(false);
    const [showToastEmail, setShowToastEmail] = useState(false);
    const [undoAddCart, setUndoAddCart] = useState(true);



    const fetchGameData = (game?: number) => {
        const endpoint = `${API_BASE_URL}/games/${game}?key=${API_KEY}`;


        fetch(endpoint, API_OPTIONS)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not fetch games.");
                }
                return response.json();
            })
            .then((data) => {
                setGameCardInfo(data || {});
            })
            .catch((err) => {
                alert(err.message || "Failed to fetch game from API");
            });
    };
    const handleToast = ()=>{
        setShowToast(true);
    }

    useEffect(() => {
        fetchGameData(gameDetails.id);

    }, [gameDetails]);

    useEffect(() => {

        const timer = setInterval(() => {
            console.log()
            setShowToast(false);
        }, 5200);

        return () => clearInterval(timer);
    }, [showToast]);




    //setting the star color
    function renderStarRating(rating: number) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const starPath = `M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286
    3.943a1 1 0 00.95.69h4.146c.969 0 1.371 1.24.588 1.81l-3.357
    2.44a1 1 0 00-.364 1.118l1.286 3.943c.3.921-.755 1.688-1.54
    1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838
    -.197-1.539-1.118l1.285-3.943a1 1 0 00-.364-1.118L2.08
    9.37c-.783-.57-.38-1.81.588-1.81h4.146a1 1 0
    00.951-.69l1.284-3.943z`;

        return (
            <div className="flex items-center space-x-1">
                {[...Array(fullStars)].map((_, i) => (
                    <svg key={`full-${i}`} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d={starPath} />
                    </svg>
                ))}
                {hasHalfStar && (
                    <svg key="half" className="w-4 h-4 text-yellow-300" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="half-grad">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="#d1d5db" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#half-grad)" d={starPath} />
                    </svg>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d={starPath} />
                    </svg>
                ))}
            </div>
        );
    }
    return (
        <>
            <div
                className="w-full max-w-lvw bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="w-full  h-80 object-contain object-top p-8 rounded-t-lg"
                         src={gameCardInfo.background_image} alt={gameCardInfo.name}/>
                </a>
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {gameDetails.name}</h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            { gameDetails.rating != undefined && renderStarRating(gameDetails.rating)}
                        </div>
                        <span
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200
                            dark:text-blue-800 ms-3">{gameDetails.rating}</span>
                    </div>
                    <div className="text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: gameCardInfo.description || '' }} />
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                        <a onClick={()=>{handleToast()}}
                           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                           font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                           dark:focus:ring-blue-800">Add
                            to cart</a>
                    </div>
                </div>
            </div>

            {showToast && (
                <>
                    <ToastModal show={showToast} onClose={() => {setShowToast(false)}}/>

                </>
               )}
        </>
    );
};

export default Card;
