// @ts-nocheck
import {Link, Outlet} from "react-router";
import {useEffect, useState, useRef} from "react";
import Loaders from "./Loaders.tsx";
import Dropdown from "./Dropdown.tsx";
import Searched from "./Searched.tsx";

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
    const [pagesize, setPagesize] = useState(1);
    const [pagesize2, setPagesize2] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const [searchedGame, setSearchedGame] = useState([]);

    const [gameDetails, setGameDetails] = useState({});

    //determine changes
    const prevPagesizeRef = useRef(pagesize);
    const prevPagesize2Ref = useRef(pagesize2);
    const prevSelectedOptionRef = useRef(selectedOption);
    const prevSearchValueRef = useRef(searchValue);

    //   FUNCTION //
    // api getting data
    const getGames = async (type) => {

        try {
            const endpoint = type == 'genre' ? `${API_BASE_URL}/genres?key=${API_KEY}`
                : type == 'gameList' && selectedOption != 'All' ? `${API_BASE_URL}/games?genres=${selectedOption.toLowerCase()}&key=${API_KEY}&page=${pagesize}`
                    : type == 'nameSearch' ? `${API_BASE_URL}/games?search=${searchValue}&key=${API_KEY}&page=${pagesize2}`
                        : `${API_BASE_URL}/games?key=${API_KEY}&page=${pagesize}`;
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
                    if(searchValue != ''){
                        console.log(data.results)
                        setSearchedGame(data.results || [])


                    }
                    break;
            }

        } catch (err) {
            // @ts-ignore
            alert(err.message || 'Failed to fetch genres from API');
        }
    }

    // page behavior
    const handlePageSizeChange = (action, pageQuery) => {
        if (pageQuery == 'leftMenu') {
            if (action == 'next') {
                setPagesize(pagesize + 1);
            } else if (action == 'prev') {
                setPagesize(pagesize - 1 == 0 ? 1 : pagesize - 1);
            }
        } else if (pageQuery == 'rightMenu') {
            if (action == 'next') {
                setPagesize2(pagesize2 + 1);
            } else if (action == 'prev') {
                setPagesize2(pagesize2 - 1 == 0 ? 1 : pagesize2 - 1);
            }
        }
    }

    //setting card data when game clicked
    const handleSelectGame = (gameData,fromList) => {

        setGameDetails(gameData)

    }

    //setting search value
    const handleSearch = () => {
        const query = document.getElementById("default-search") as HTMLInputElement;
        setSearchValue(query.value);
        // Perform search logic
    }
    //behavior for every enter or search in searchbar
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Optional: prevent default form submission if inside a form
            handleSearch();
        }
    }

    //   USEFFECTS

    //getting the defaule genre list
    useEffect(() => {
        getGames('genre');
    }, []);

    //
    useEffect(() => {
        //setting the value for every genre select
        if (selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase()) {

            if (selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase()) {
                setPagesize(1); // This will trigger a state update

            }
            if (selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase() && pagesize == 1) {

                getGames('gameList');
            }

        }
        //setting the value for every search
        if (searchValue.toLowerCase() != prevSearchValueRef.current.toLowerCase()) {
            if (searchValue.toLowerCase() != prevSearchValueRef.current.toLowerCase()) {
                setPagesize2(1); // This will trigger a state update

            }
            if (searchValue.toLowerCase() != prevSearchValueRef.current.toLowerCase() && pagesize2 == 1) {

                getGames('nameSearch');
            }
        }

        prevSelectedOptionRef.current = selectedOption;
        prevSearchValueRef.current = searchValue;
    }, [selectedOption, searchValue]);


    // useEffect for page
    useEffect(() => {

        if (selectedOption.toLowerCase() == prevSelectedOptionRef.current.toLowerCase()) {
            getGames('gameList');
        }
        if (searchValue.toLowerCase() == prevSearchValueRef.current.toLowerCase()) {
            getGames('nameSearch');
        }
        prevPagesizeRef.current = pagesize;
        prevPagesize2Ref.current = pagesize2;
        prevSelectedOptionRef.current = selectedOption;
        prevSearchValueRef.current = searchValue;


    }, [pagesize, pagesize2]);


    // useEffect(() => {
    //
    // }, [gameData]);

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
                                       onClick={()=>{handleSelectGame(data,'leftMenu')}}
                                >{data.name}</Link>

                            ))}
                    </div>
                    <button onClick={() => (handlePageSizeChange('next', 'leftMenu'))}>Next</button>
                    <button onClick={() => (handlePageSizeChange('prev', 'leftMenu'))}>Prev</button>
                </div>
            </div>

            {/* Main Content (Col Span 8) */}
            <div
                className="col-span-12 md:col-span-8 p-4 shadow-md bg-gray-900/25 order-2 md:order-2 flex flex-col">
                {/*//add some context here*/}
                <Outlet />
            </div>

            <div className="col-span-12 md:col-span-2 p-4 bg-gray-900/25 order-3 md:order-3">


                        <Searched searchSettings={{
                            searchedGame: searchedGame,
                            setSearchedGame: setSearchedGame,
                            handlePageSizeChange: handlePageSizeChange,
                            handleSearch: handleSearch,
                            handleKeyDown: handleKeyDown,
                            searchValue: searchValue
                        }}/>


            </div>

        </div>
    );
};

export default Store;
