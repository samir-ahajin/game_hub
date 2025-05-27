// @ts-nocheck

import {useOutletContext} from "react-router";
import Carousel2 from "./Carousel2.tsx";
const Home = () => {

    const { mainBackGroundList } = useOutletContext();



    return (

            <div className=" w-full h-10/10 flex flex-col items-center justify-center">
                <h6 className="text-white text-2xl font-bold ">Games of the Week</h6>
                {
                    <Carousel2 features={mainBackGroundList} />

               }</div>


    );
};

export default Home;
