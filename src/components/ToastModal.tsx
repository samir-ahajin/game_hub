import * as React from "react";
import {useState,useEffect} from "react";
type ToastModalProps = {
    show: boolean;
    onClose: () => void;
};
const ToastModal = ({show,onClose}:ToastModalProps) => {
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        if (counter === 0) return;

        const timer = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [counter]);


    return (
       <>
           <div
               className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl bg-gray-900 text-white rounded-xl p-4 flex items-center justify-between shadow-lg`}
           >
               <div>
                   <p className="text-sm text-gray-500 ">
                       Remove added game.
                   </p>
               </div>

               <div className="flex items-center space-x-2 ml-4">
                    <span className="font-bold text-gray-600">
                      <span
                          style={{ '--value': counter } as React.CSSProperties}
                          aria-live="polite"
                          aria-label={String(counter)}
                      >
                        {counter}
                      </span>
                    </span>
                   <button className="border text-gray-400 border-gray-400 text-sm px-3 py-1 rounded-md hover:text-white hover:border-white ">Undo</button>

                   <button onClick={() => onClose()} className="text-gray-400 border-gray-400 hover:text-white text-sm  px-2">
                       ✕
                   </button>
               </div>
           </div>
       </>
    );
};

export default ToastModal;