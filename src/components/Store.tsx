// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Link, Outlet} from "react-router";
import {useEffect, useState, useRef} from "react";
import Loaders from "./Loaders.tsx";
import Dropdown from "./Dropdown.tsx";
import Searched from "./Searched.tsx";
import {API_BASE_URL, API_KEY, API_OPTIONS} from '../App.tsx';
import {useDebounce} from "react-use";
import {updateCartValue, updateSearchValue} from "../appwrite.js";
import { useOutletContext } from "react-router-dom";



const Store = () => {
    const {emailCart, setEmailCart } = useOutletContext();

    
    const [genres, setGenres] = useState([])
    const [selectedOption, setSelectedOption] = useState('All');
    const [gameList, setGameList] = useState([]);
    const [pageSize, setPageSize] = useState(1);
    const [pageSize2, setPageSize2] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const [searchedGame, setSearchedGame] = useState([]);


    const [gameDetails, setGameDetails] = useState({});

    //delay or debouncing
    const [debounceSearch, setDebounceSearch] = useState("");
    //determine changes
    const prevPageSizeRef = useRef(pageSize);
    const prevPageSize2Ref = useRef(pageSize2);
    const prevSelectedOptionRef = useRef(selectedOption);
    const prevSearchValueRef = useRef(searchValue);

    //   FUNCTION //
    // api getting data
    const getGames = async (type) => {

        try {
            const endpoint = type == 'genre' ? `${API_BASE_URL}/genres?key=${API_KEY}`
                : type == 'gameList' && selectedOption != 'All' ? `${API_BASE_URL}/games?genres=${selectedOption.toLowerCase()}&key=${API_KEY}&page=${pageSize}`
                    : type == 'nameSearch' ? `${API_BASE_URL}/games?search=${encodeURIComponent(searchValue)}&key=${API_KEY}&page=${pageSize2}`
                        : `${API_BASE_URL}/games?key=${API_KEY}&page=${pageSize}`;

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
                    setGameList(data.results || [])

                    break;

                case 'nameSearch':
                    if (searchValue != '') {
                        setSearchedGame(data.results || []);
                    }
                    break;
            }

        } catch (err) {
            if (err) {
                console.warn("API key not defined. Skipping fetch.");
                return;
            }
        }
    }


    // page behavior
    const handlePageSizeChange = (action, pageQuery) => {
        if (pageQuery == 'leftMenu') {
            if (action == 'next') {
                setPageSize(pageSize + 1);
            } else if (action == 'prev') {
                setPageSize(pageSize - 1 == 0 ? 1 : pageSize - 1);
            }
        } else if (pageQuery == 'rightMenu') {
            if (action == 'next') {
                setPageSize2(pageSize2 + 1);
            } else if (action == 'prev') {
                setPageSize2(pageSize2 - 1 == 0 ? 1 : pageSize2 - 1);
            }
        }
    }

    //setting card data when game clicked
    const handleSelectGame = (gameData, fromList) => {

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
    //getting the default genre list
    useEffect(() => {
        getGames('genre');
    }, []);

    useEffect(() => {
        //setting the value for every genre select
        if (selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase()) {

            if (selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase()) {
                setPageSize(1); // This will trigger a state update

            }
            if (selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase() && pageSize == 1) {

                getGames('gameList');
            }

        }


        prevSelectedOptionRef.current = selectedOption;

    }, [selectedOption]);

    // useEffect for page
    useEffect(() => {

        if (selectedOption.toLowerCase() == prevSelectedOptionRef.current.toLowerCase()) {
            getGames('gameList');
        }
        if (searchValue.toLowerCase() == prevSearchValueRef.current.toLowerCase()) {
            getGames('nameSearch');
        }
        prevPageSizeRef.current = pageSize;
        prevPageSize2Ref.current = pageSize2;
        prevSelectedOptionRef.current = selectedOption;
        prevSearchValueRef.current = searchValue;


    }, [pageSize, pageSize2]);

    useDebounce(() => setDebounceSearch(searchValue), 500, [searchValue])
    useEffect(() => {
        //setting the value for every search
        if (debounceSearch.toLowerCase() != prevSearchValueRef.current.toLowerCase()) {
            if (debounceSearch.toLowerCase() != prevSearchValueRef.current.toLowerCase()) {
                setPageSize2(1); // This will trigger a state update

            }
            if (debounceSearch.toLowerCase() != prevSearchValueRef.current.toLowerCase() && pageSize2 == 1) {

                getGames('nameSearch');
                if(debounceSearch != "" ){
                    updateSearchValue(debounceSearch,'sam');
                }

            }
        }
        prevSearchValueRef.current = debounceSearch;


    }, [debounceSearch]);


    // useEffect(() => {
    //
    // }, [gameData]);

    return (
        <div className=" w-full h-10/10 grid grid-cols-12 gap-4">
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
                    <div className="flex flex-col gap-4 p-1.5 relative">
                        {/* Scrollable list container */}
                        <div className="max-h-73 overflow-y-auto pr-1">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    {gameList
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((data, index) => (
                                            <Link
                                                key={index}
                                                to={`${data.id}`}
                                                className="flex h-[70px] bg-gray-800 rounded-lg overflow-hidden transition hover:bg-gray-700"
                                                onClick={() => handleSelectGame(data, 'leftMenu')}
                                            >
                                                <div className="relative w-1/4 min-w-[25%] overflow-hidden">
                                                    <img
                                                        src={data.background_image || '/default-avatar.png'}
                                                        alt={data.name}
                                                        className="absolute top-0 left-0 w-full h-full object-cover "
                                                    />
                                                </div>

                                                <div className="w-3/4 px-3 py-2 flex flex-col justify-center overflow-hidden">
                                                <span className="text-sm font-medium text-slate-200 truncate">
                                                    {data.name}
                                                </span>
                                                    <span className="text-xs text-slate-400 truncate">
                                                    {data.role || 'Game Info'}
                                                </span>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between mt-2">

                            {gameList.length > 0 && (
                                <>
                                    {pageSize > 1 && (
                                        <button
                                            className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                                            onClick={() => handlePageSizeChange('prev', 'leftMenu')}
                                        >
                                            Prev
                                        </button>
                                    )}
                                    <button
                                        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                                        onClick={() => handlePageSizeChange('next', 'leftMenu')}
                                    >
                                        Next
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content (Col Span 8) */}
            <div
                className="col-span-12 md:col-span-8 p-4 shadow-md bg-gray-900/25 order-2 md:order-2 flex flex-col">
                {/*//add some context here*/}
                <Outlet context={{gameDetails:gameDetails,emailCart:emailCart,setEmailCart:setEmailCart}} />
            </div>

            <div className="col-span-12 md:col-span-2 p-4 bg-gray-900/25 order-3 md:order-3">


                <Searched searchSettings={{
                    searchedGame: searchedGame,
                    setSearchedGame: setSearchedGame,
                    handlePageSizeChange: handlePageSizeChange,
                    handleSearch: handleSearch,
                    handleKeyDown: handleKeyDown,
                    handleSelectGame: handleSelectGame,
                    pageSize2:pageSize2,
                    searchValue: searchValue
                }}/>


            </div>

        </div>
    );
};

export default Store;
