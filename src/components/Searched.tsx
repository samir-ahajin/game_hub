import {Link} from "react-router";

type searchVal = {
    searchSettings: {
        searchedGame:[],
        setSearchedGame: (value: string) => void,
        handlePageSizeChange: (value1: string,value2:string) => void,
        handleSearch: () => void,
        handleKeyDown: (value:any)=> void,
        searchValue:string,
    };
};
const Searched = ({searchSettings}:searchVal) => {
   const {searchedGame,searchValue, handlePageSizeChange,handleSearch,handleKeyDown} = searchSettings;
    return (
        <><div>
            <div className="relative">
                <div>
            <button onClick={()=>{handleSearch()}}
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
                onKeyDown={(e)=>{handleKeyDown(e)}}
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

            {searchValue == ""?(<div>No Search Yet</div>):(
                searchedGame
                .map((value:any ,index:any)=>{
                    return(
                        < Link key={index} to={`${value.id}`}
                               className="w-full overflow-hidden
                                            text-ellipsis  bg-gray-800 text-slate-100 flex items-center rounded-md p-3 transition-all hover:bg-slate-100 hover:text-gray-900 focus:text-white active:bg-slate-100"
                        >{value.name}</Link>
                    )

                }))}
            </div>
            {searchedGame.length > 0 ? (
                <>
                    <div>
                        <button onClick={() => {handlePageSizeChange('next','rightMenu')}}>Next</button>
                        <button onClick={() => {handlePageSizeChange('prev','rightMenu')}}>Prev</button>
                    </div>
                </>
            ):(<></>)
            }
        </>
    );
};

export default Searched;
