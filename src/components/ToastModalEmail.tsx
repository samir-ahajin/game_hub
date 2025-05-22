import React from 'react';

const ToastModalEmail = () => {
    return (
        <>
            <div
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl bg-gray-900 text-white rounded-xl p-4 flex items-center justify-between shadow-lg`}
            >
                <div>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path
                                d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path
                                d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                    </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">

                    <button
                        className="border text-gray-400 border-gray-400 text-sm px-3 py-1 rounded-md hover:text-white hover:border-white ">Add</button>

                    <button onClick={() => {}} className="text-gray-400 border-gray-400 hover:text-white text-sm  px-2">
                        ✕
                    </button>
                </div>
            </div>
        </>
    );
};

export default ToastModalEmail;