import {Link} from "react-router";
import Loaders2 from "./Loaders2.tsx";

type searchVal = {
    searchSettings: {
        searchedGame: [],
        setSearchedGame: (value: string) => void,
        handlePageSizeChange: (value1: string, value2: string) => void,
        handleSearch: () => void,
        handleKeyDown: (...value: any) => void,
        handleSelectGame: (value: string, value1: string) => void,
        searchValue: string,
        pageSize2: number,
        loadingSearch:boolean
    };
};


const Searched = ({searchSettings}: searchVal) => {
    const {
        searchedGame,
        searchValue,
        loadingSearch,
        pageSize2,
        handlePageSizeChange,
        handleSearch,
        handleKeyDown,
        handleSelectGame
    } = searchSettings;

    return (
        <>
            <div>
                <div className="relative">
                    <div>
                        <button onClick={() => {
                            handleSearch()
                        }}
                                className="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-300 dark:text-gray-400">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>

                        <input
                            type="search"
                            id="default-search"
                            onKeyDown={(e) => {
                                handleKeyDown(e)
                            }}
                            onChange={() => {
                                handleSearch()
                            }}
                            className="block w-full p-4 ps-10 text-sm text-gray-200 border border-gray-800 rounded-full bg-gray-800
             focus:bg-white focus:text-black focus:ring-blue-500  focus:border-white
             dark:bg-gray-700 dark:border-white focus:outline-none dark:placeholder-white dark:text-white
             dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                            required
                        />

                    </div>
                </div>
            </div>


            <div className=" flex relative flex-col gap-1 p-1.5">
                <div className="max-h-80 overflow-y-auto pr-1">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            {loadingSearch?(<Loaders2 />) : searchValue == "" ? (<div>No Search Yet</div>) : (
                                searchedGame
                                    .map((value: any, index: number) => {
                                        return (
                                            < Link key={index} to={`${value.id}`}
                                                   className="flex h-[70px] bg-gray-800 rounded-lg overflow-hidden transition hover:bg-gray-700"
                                                   onClick={() => {
                                                       handleSelectGame(value, 'leftMenu');
                                                       console.log(value);
                                                   }}
                                            >
                                                <div className="relative w-1/4 min-w-[25%] overflow-hidden">
                                                    <img
                                                        src={value.background_image || '/default-avatar.png'}
                                                        alt={value.name}
                                                        className="absolute top-0 left-0 w-full h-full object-cover "
                                                    />
                                                </div>

                                                <div
                                                    className="w-3/4 px-3 py-2 flex flex-col justify-center overflow-hidden">
                                                <span className="text-sm font-medium text-slate-200 truncate">
                                                    {value.name}
                                                </span>
                                                    <span className="text-xs text-slate-400 truncate">
                                                    {value.role || 'Game Info'}
                                                </span>
                                                </div>
                                            </Link>
                                        )

                                    }))}
                        </div>
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-2">

                    {searchedGame.length > 0 && (
                        <>
                            {pageSize2 > 1 && (
                                <button
                                    className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                                    onClick={() => handlePageSizeChange('prev', 'rightMenu')}
                                >
                                    Prev
                                </button>
                            )}
                            <button
                                className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                                onClick={() => handlePageSizeChange('next', 'rightMenu')}
                            >
                                Next
                            </button>
                        </>
                    )}
                </div>
            </div>

        </>
    );
};

export default Searched;
