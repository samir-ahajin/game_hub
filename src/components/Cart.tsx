import {Link} from "react-router";

const Store = () => {
    return (
        <div className="w-full h-10/10 bg-black">
            <p>Hi, I am Spinach! I love to eat Spinach!</p>
            <Link to="/">Click here to go back</Link>
        </div>
    );
};

export default Store;
