// @ts-nocheck

import {useOutletContext} from "react-router";
import Carousel2 from "./Carousel2.tsx";
const Home = () => {

    const { mainBackGroundList } = useOutletContext();



    return (
        <div className="w-full h-9/10 flex flex-col items-center p-4 ">
            <h6 className="text-white text-2xl font-bold p-4">Games of the Week</h6>
            <div className="mt-4 w-full max-w-6xl mx-auto p-4">
                <Carousel2 features={mainBackGroundList} />
            </div>
        </div>


    );
};

export default Home;
