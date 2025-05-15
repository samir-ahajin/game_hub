import Card from './Card';
import {useOutletContext} from "react-router";



const GameDetail = () => {
    const   gameDetails = useOutletContext()


    return (
        <div>
        <Card gameDetails={gameDetails}></Card>
        </div>
    );
};

export default GameDetail;
