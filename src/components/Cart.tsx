//import {Link} from "react-router";
import {useState} from "react";
import { useOutletContext} from "react-router-dom";
import ToastModalEmail from "./ToastModalEmail.tsx";
type CartContextType = {
    emailCart: string;
    handleEmail:(value:string)=>void;
};

const Store = () => {
    const { emailCart, handleEmail } = useOutletContext<CartContextType>();
    const [showToastEmail, setShowToastEmail] = useState(false);

    const handleToast = () => {

            setShowToastEmail(true);
    }

    return (
        //
        //     <p>Hi, I am Spinach! I love to eat Spinach!</p>
        //     <Link to="/store    ">Click here to go back</Link>
        // </div>
        <>
            <div className="w-full h-10/10 bg-gray-900/25">
            <div className="h-10/10 ">
                <h3>{emailCart}</h3>
                {emailCart ? (
                    <div className="bg-base-100 border-base-300 collapse border">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
                        >
                            How do I create an account?
                        </div>
                        <div
                            className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
                        >
                            Click the "Sign Up" button in the top right corner and follow the registration process.
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <button
                            onClick={()=>{
                                handleToast();
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                            No Email Yet
                        </button>
                    </div>
                )}
            </div>
                {showToastEmail && (
                    <ToastModalEmail emailCart={emailCart} handleEmail={handleEmail} onClose={() => {
                    setShowToastEmail(false);
                }}/>) }
        </div>
        </>
    );
};

export default Store;
