import {Link} from "react-router";
import {useEffect, useState, useRef} from "react";
import Loaders from "./Loaders.tsx";
import Dropdown from "./Dropdown.tsx";


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

    //determine changes
    const prevSelectedOptionRef = useRef(selectedOption);

    const getGenres = async (type) => {

        try {
            const endpoint = type == 'genre' ? `${API_BASE_URL}/genres?key=${API_KEY}`
                : type == 'gameList' && selectedOption != 'All' ? `${API_BASE_URL}/games?genres=${selectedOption.toLowerCase()}&key=${API_KEY}&page=${pagesize}`
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
                    console.log(data.results);
                    setGamelist(data.results || [])
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
        getGenres('genre');
    }, []);

    useEffect(() => {
        console.log('size')

        if (selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase()) {
            setPagesize(1); // This will trigger a state update

        }
        if(selectedOption.toLowerCase() != prevSelectedOptionRef.current.toLowerCase() && pagesize == 1){

            getGenres('gameList');
        }


        prevSelectedOptionRef.current = selectedOption;
    }, [selectedOption]);

    useEffect(() => {

        if (selectedOption.toLowerCase() == prevSelectedOptionRef.current.toLowerCase()) {
            getGenres('gameList');
        }


        prevSelectedOptionRef.current = selectedOption;

    }, [pagesize]);

    return (
        <div className="    w-full h-10/10 grid grid-cols-12 gap-4">
            {/* Left Column (Col Span 2) */}
            <div className="col-span-12 md:col-span-2 p-4 bg-gray-900/25 order-1 md:order-1">
                <h1>Hello from the main page of the app!</h1>
                <Dropdown genres={genres}
                          optionSettings={{
                              selectedOption: selectedOption,
                              setSelectedOption: setSelectedOption
                          }}

                />
                <div>
                    <ul>
                        {gamelist
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((data, index) => (
                                <li key={index}>
                                    <Link to={`/games/${data.id}`}
                                    >{data.name}</Link>
                                </li>
                            ))}
                    </ul>
                    <button onClick={() => (handlePageSizeChange('next'))}>Next</button>
                    <button onClick={() => (handlePageSizeChange('prev'))}>Prev</button>
                </div>
            </div>

            {/* Main Content (Col Span 8) */}
            <div
                className="col-span-12 md:col-span-8 p-4 shadow-md bg-gray-900/25 order-2 md:order-2 flex flex-col">


                <nav>
                    <ul>
                        <li>
                            <Link to="gamelist/popeye">Header Games List</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Right Column (Col Span 2) */}
            <div className="col-span-12 md:col-span-2 p-4 bg-gray-900/25 order-3 md:order-3">
                <p>Here are some examples of links to other pages</p>
            </div>

        </div>
    );
};

export default Store;
