import {useState} from "react";


type ToastEmailContextType = {
    emailCart: string;
    onClose: () => void;
    handleEmail:(value:string)=>void;
};

const ToastModalEmail = ({onClose,handleEmail}:ToastEmailContextType) => {
    const [tempEmail, setTempEmail] = useState("");

    const handleAddEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(tempEmail)) {
            alert('Please enter a valid email address.');
            return;
        }
        // Proceed with valid email

        console.log(tempEmail);

        handleEmail(tempEmail);
        onClose();
    };
    const handleTempEmail = (email:string)=>{
        setTempEmail(email)
    };
    return (
        <>
            <div
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl bg-gray-900 text-white 
    rounded-xl p-3 flex items-center justify-between shadow-lg z-50`}
            >
                <div className="flex items-center space-x-2 w-full px-3">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                        <path
                            d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                        <path
                            d="M11.241  9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    </svg>

                    <input
                        type="email"
                        id="email"
                        value={tempEmail}
                        onChange={(e) => {
                            handleTempEmail(e.target.value)

                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                         focus:ring-blue-500 focus:border-blue-500 w-80 px-3 py-1.5
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="s******@email.com"
                        required
                    />
                </div>

                <div className="flex items-center space-x-2 ml-4">
                    <button
                        onClick={()=>{

                            handleAddEmail()}}
                        className="w-25 border text-gray-400 border-gray-400 text-sm px-3 py-1 rounded-md hover:text-white hover:border-white">
                        Add Email
                    </button>
                    <button
                        onClick={() => {onClose()
                        }}
                        className="text-gray-400 border-gray-400 hover:text-white text-sm px-2">
                        ✕
                    </button>
                </div>
            </div>
        </>
    );
};

export default ToastModalEmail;