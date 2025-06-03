// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Link} from "react-router";
import Carousel2 from "./Carousel2.tsx";
import {useEffect, useState} from "react";
import {API_BASE_URL,API_KEY,API_OPTIONS} from "../App.tsx";
import Loaders from "./Loaders.tsx";

const Default = () => {

    const [gameOfTheYear, setGameOfTheYear] = useState([])
    const [loading, setLoading] = useState(false)
//   FUNCTION //

    const fetchGameOfTheYear = async () => {

        const year = new Date().getFullYear();
        const yearDate=`&dates=${year}-01-01,${year}-12-31`
        setLoading(true);
        try {
            const endpoint = `${API_BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=20${yearDate}`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error("Could not fetch the latest game.");
            }
            const data = await response.json();

            if (data.Response === 'False') {
                alert(data.error || 'Failed to fetch game of the week from API');
                setGameOfTheYear([])
            }
            setGameOfTheYear(data.results.filter((datum:never) => datum.background_image != null) || [])

        } catch (err) {
            console.log(err.message);
        }   finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGameOfTheYear();
    }, []);


    return (
        <div className="bg-black/80 flex flex-col items-center justify-center overflow-y-auto ">
            <div className="mt-4 w-full max-w-6xl mx-auto p-4">
                {loading?(<Loaders />):(<Carousel2 features={gameOfTheYear} />)}
            </div>
            <div className="flex flex-col items-center justify-center p-4">
            <Link to="/">
                <span className="text-gray-500 hover:text-gray-400">Back to home</span>
            </Link>
            </div>
        </div>
    );
};

export default Default;
