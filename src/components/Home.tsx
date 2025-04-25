import {useOutletContext} from "react-router";

const Home = () => {
    // @ts-ignore
    const { mainBackGroundlist } = useOutletContext();


    return (
        <div className="w-full h-10/10 bg-black">
            <ul>
                {mainBackGroundlist.map((item, index) => (
                    <li key={item.id + '-' + index}>{item.name}</li>
                ))}
            </ul>
            </div>
    );
};

export default Home;
