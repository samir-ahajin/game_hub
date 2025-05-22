import Card from './Card';
import {useOutletContext} from "react-router";
import React from "react";

type Game = {
    id:number,
    name: string,
    description: string,
    rating: number,
};
type GameDetailContextType = {
    gameDetails: Game;
    emailCart: string;
    setEmailCart: React.Dispatch<React.SetStateAction<string>>;
};
const GameDetail = () => {
    const {gameDetails,emailCart, setEmailCart } = useOutletContext<GameDetailContextType>();


    return (
        <div>
        <Card gameDetails={gameDetails} emailCart={emailCart} setEmailCart={setEmailCart}></Card>
        </div>
    );
};

export default GameDetail;
