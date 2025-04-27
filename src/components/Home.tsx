// @ts-nocheck

import {useOutletContext} from "react-router";
import Carousel2 from "./Carousel2.tsx";
import { Button } from "@material-tailwind/react";
const Home = () => {
    // @ts-ignore
    const { mainBackGroundlist } = useOutletContext();



    return (

            <div className="bg-gray-900/50 w-8/10 flex flex-col items-center justify-center">
                <h6 className="text-white text-2xl font-bold ">Games of the Week</h6>
                {
                    <Carousel2 features={mainBackGroundlist} />

               }</div>


    );
};

export default Home;
