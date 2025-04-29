import {Link,Outlet} from "react-router";
import {useEffect, useState, useRef} from "react";
import Loaders from "./Loaders.tsx";
import Dropdown from "./Dropdown.tsx";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid } from 'react-icons/fa';

const API_BASE_URL = "https://api.rawg.io/api"
const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const API_OPTIONS = {
    method: "GET",
    accept: 'application/json',
    authorization: `Bearer ${API_KEY}`,
}


const Store = () => {
    const [genres, setGenres] = useState([])
    const [selectedOption, setSelectedOption] = useState('All');
    const [gamelist, setGamelist] = useState([]);
    const [pagesize, setPagesize] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const [searchedGame, setSearchedGame] = useState([]);

    //determine changes
    const prevSelectedOptionRef = useRef(selectedOption);

    const getGames = async (type) => {

        try {
            const endpoint = type == 'genre' ? `${API_BASE_URL}/genres?key=${API_KEY}`
                : type == 'gameList' && selectedOption != 'All' ? `${API_BASE_URL}/games?genres=${selectedOption.toLowerCase()}&key=${API_KEY}&page=${pagesize}`
                    : type == 'nameSearch'?`${API_BASE_URL}/games?search=${searchValue}&key=${API_KEY}&page=${pagesize}`
                        :`${API_BASE_URL}/games?key=${API_KEY}&page=${pagesize}`;
            const response = await fetch(endpoint, API_OPTIONS);


            if (!response.ok) {
                throw new Error("Could not fetch genres from API.");
            }
            const data = await response.json();


            switch (type) {
                case 'genre':
                    setGenres(data.results || [])
                    break;
                case 'gameList':
                    setGamelist(data.results || [])
                    break;

                case 'nameSearch':
                    console.log(data.results)
                    setSearchedGame(data.results || [])
                    break;
            }

        } catch (err) {
            // @ts-ignore
            alert(err.message || 'Failed to fetch genres from API');
        }
    }

    const handlePageSizeChange = (action) => {

        if (action == 'next') {
            setPagesize(pagesize + 1);
        } else if (action == 'prev') {
            setPagesize(pagesize - 1 == 0 ? 1 : pagesize - 1);
        }
    }
    useEffect(() => {
        getGames('genre');
    }, []);

    useEffect(() => {
        console.log('size')

        if (selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase()) {
            setPagesize(1); // This will trigger a state update

        }
        if(selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase() && pagesize == 1){

            getGames('gameList');
        }


        prevSelectedOptionRef.current = selectedOption;
    }, [selectedOption]);

    useEffect(() => {

        if (selectedOption.toLowerCase() == prevSelectedOptionRef.current.toLowerCase()) {
            getGames('gameList');
        }


        prevSelectedOptionRef.current = selectedOption;

    }, [pagesize]);

    useEffect(() => {
        getGames('nameSearch');
    }, [searchValue]);

    function handleSearch() {
        const query = document.getElementById("default-search") as HTMLInputElement;
       setSearchValue(query.value);
        // Perform search logic
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Optional: prevent default form submission if inside a form
            handleSearch();
        }
    }
    return (
        <div className="    w-full h-10/10 grid grid-cols-12 gap-4">
            {/* Left Column (Col Span 2) */}
            <div className="col-span-12 md:col-span-2 p-4 bg-gray-900/25 order-1 md:order-1">
                <h1>CATEGORIES</h1>
                <Dropdown genres={genres}
                          optionSettings={{
                              selectedOption: selectedOption,
                              setSelectedOption: setSelectedOption
                          }}

                />
                <div>
                    <div className=" flex relative flex-col gap-1 p-1.5">
                        {gamelist
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((data, index) => (

                                    < Link key={index} to={`${data.id}`}
                                           className="w-full overflow-hidden text-ellipsis  bg-gray-800 text-slate-100 flex items-center rounded-md p-3 transition-all hover:bg-slate-100 hover:text-gray-900 focus:text-white active:bg-slate-100"
                                    >{data.name}</Link>

                            ))}
                    </div>
                    <button onClick={() => (handlePageSizeChange('next'))}>Next</button>
                    <button onClick={() => (handlePageSizeChange('prev'))}>Prev</button>
                </div>
            </div>

            {/* Main Content (Col Span 8) */}
            <div
                className="col-span-12 md:col-span-8 p-4 shadow-md bg-gray-900/25 order-2 md:order-2 flex flex-col">


                  <Outlet />

            </div>

            {/* Right Column (Col Span 2) */}
            <div className="col-span-12 md:col-span-2 p-4 bg-gray-900/25 order-3 md:order-3">

                <div className="relative">
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
    );
};

export default Store;
