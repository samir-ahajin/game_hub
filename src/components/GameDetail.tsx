import Card from './Card';
import {useOutletContext} from "react-router";


type Game = {
    id:number,
    name: string,
    description: string,
    rating: number,
};
type GameDetailContextType = {
    gameDetails: Game;
    emailCart: string;
    handleEmail:(value:string)=>void;
};
const GameDetail = () => {
    const {gameDetails,emailCart,handleEmail} = useOutletContext<GameDetailContextType>();



    return (
        <div>
        <Card cardComponents={{gameDetails,emailCart,handleEmail}}></Card>
        </div>
    );
};

export default GameDetail;
