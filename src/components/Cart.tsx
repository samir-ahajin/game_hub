//import {Link} from "react-router";
import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import ToastModalEmail from "./ToastModalEmail.tsx";
import {getUserGameList, removeId} from "../appwrite.ts";
import Loaders from "./Loaders.tsx";

type CartContextType = {
    emailCart: string;
    handleEmail: (value: string) => void;
    updateUserGameTotal: (value: string) => void;
};
type userDataType = {
    documents: never[],
    total: number
}


const Store = () => {
    const {emailCart, handleEmail, updateUserGameTotal} = useOutletContext<CartContextType>();
    const [showToastEmail, setShowToastEmail] = useState(false);
    const [dataList, setDataList] = useState<userDataType>({
        documents: [],
        total: 0
    });
    const [loading, setLoading] = useState(false);


    const handleToast = () => {

        setShowToastEmail(true);
    }

    const handleRemoveGame = async (id: string) => {
        setLoading(true);
        try {
            await removeId(emailCart, id);
            await getUserGameList(emailCart).then((data: any) => {

                setDataList(data);
                handleEmail(emailCart);
                updateUserGameTotal(emailCart);
            })
                .catch((err: string) => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                })

        } catch (e) {
            console.error(e);
        }

    }

    useEffect(() => {
        if (emailCart) {
            setLoading(true);
            getUserGameList(emailCart)
                .then((data: any) => {
                    setDataList(data);
                })
                .catch((err: string) => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                })

        }
    }, [emailCart])

    return (
        //
        //     <p>Hi, I am Spinach! I love to eat Spinach!</p>
        //     <Link to="/store    ">Click here to go back</Link>
        // </div>
        <>
            <div className="w-full h-10/10 bg-gray-900/70">
                <div className="p-3">
                    <h3 className="font-bold"> Total games Added <span
                        className="text-yellow-400">{dataList?.total || 0}</span></h3>


                </div>
                <div className="h-9/10 p-2 overflow-y-auto ontent-center">
                    {loading ? (
                        <div className="h-full flex items-center justify-center">
                            <Loaders/>
                        </div>) : emailCart ? (
                        <>

                            {dataList.documents.map((item: any, index: number) => {
                                return (

                                    <div
                                        key={index}
                                        className="collapse collapse-arrow bg-gray-900/40 m-4 max-w-1xl mx-auto"
                                    >
                                        <input type="checkbox" className="peer"/>

                                        <div
                                            className="collapse-title bg-gray-900 text-primary-content peer-checked:bg-gray-300/25 peer-checked:text-secondary-content"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={item.game_image_url}
                                                        alt={item.game_name}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                    <div>
                                                        <div className="font-bold text-lg">{item.game_name}</div>
                                                        <div className="text-sm opacity-80">Action RPG not yet added
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="collapse-content bg-gray-900 text-primary-content peer-checked:bg-gray-300/25 peer-checked:text-secondary-content"
                                        >
                                            <div className="flex flex-col gap-4">

                                                <article className="text-white dark:text-white">
                                                    <p className="indent-8">
                                                              <span
                                                                  dangerouslySetInnerHTML={{__html: item?.game_description || ''}}
                                                              />
                                                    </p>
                                                </article>

                                                <button
                                                    className="btn btn-error text-white w-full"
                                                    onClick={() => handleRemoveGame(item.$id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => {
                                        handleToast();
                                    }}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                                    Change Email
                                </button>
                            </div>
                        </>

                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <button
                                onClick={() => {
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
                    }}/>)}
            </div>
        </>
    );
};

export default Store;
