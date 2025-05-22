import {Link, useOutletContext} from "react-router";
import React from "react";

type CartContextType = {
    emailCart: string;
    setEmailCart: React.Dispatch<React.SetStateAction<string>>;
};

const Store = () => {
    const { emailCart, setEmailCart } = useOutletContext<CartContextType>();


    return (
        <div className="w-full h-10/10 bg-black">
            <p>Hi, I am Spinach! I love to eat Spinach!</p>
            <Link to="/">Click here to go back</Link>
        </div>
    );
};

export default Store;
