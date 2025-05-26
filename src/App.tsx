// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {Link, Outlet, useLocation} from "react-router";
import {useEffect, useState, useMemo} from "react";
import MatrixRain from "./components/MatrixRain.tsx";
import {newUserId} from "./appwrite";


export const API_BASE_URL = "https://api.rawg.io/api";

// eslint-disable-next-line react-refresh/only-export-components
export const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

// eslint-disable-next-line react-refresh/only-export-components
export const API_OPTIONS = {
    method: "GET",
    accept: 'application/json',
    authorization: `Bearer ${API_KEY}`,
};


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function App() {
    const [games, setGames] = useState([])
    const [errorDisplay, setErrorDisplay] = useState()
    const [mainBackGroundList, setMainBackGroundList] = useState([])


    const [emailCart, setEmailCart] = useState("")

    const [backgroundIndex, setBackgroundIndex] = useState(0)
    const [pageCount, setPageCount] = useState(1);
    const [bgImage, setBgImage] = useState();
    const [cartCon, setCartCon] = useState([]);


    const location = useLocation();

    // const fetchGames = async (query = '') => {
    //     const today = new Date();
    //     const formatted = today.toISOString().split('T')[0];
    //     try {
    //         const endpoint = query ?
    //             `${API_BASE_URL}/games?key=${API_KEY}` :
    //             `${API_BASE_URL}/games?key=${API_KEY}&page=${pageCount}&page_size=20&dates=2025-01-01,${formatted}`
    //         const response = await fetch(endpoint, API_OPTIONS);
    //
    //         console.log(API_OPTIONS+endpoint);
    //         if (!response.ok) {
    //             throw new Error("Could not fetch games.");
    //         }
    //         const data = await response.json();
    //
    //
    //         if (data.Response === 'False') {
    //
    //             setErrorDisplay(data.error || 'Failed to fetch games from API');
    //             setGames([])
    //
    //         }
    //         setGames(data.results || [])
    //
    //
    //     } catch (err) {
    //         setErrorDisplay(err.message || 'Failed to fetch games from API');
    //     }
    //
    // }


    const navigation = useMemo(() => [
        {name: 'Home', href: '/'},
        {name: 'Store', href: '/store'},
        {name: 'Cart', href: '/cart'}
    ], []);

    const updatedNavigation = navigation.map(item => ({
        ...item,
        current: location.pathname === item.href
    }));

    const fetchGameOfTheWeek = async (): Promise<void> => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const sundayOffset = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

        const monday = new Date(today);
        monday.setDate(today.getDate() + mondayOffset);
        const sunday = new Date(today);
        sunday.setDate(today.getDate() + sundayOffset);

        const formatDate = (d) => d.toISOString().split('T')[0];


        try {
            const endpoint = `${API_BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=20&dates=${formatDate(monday)},${formatDate(sunday)}`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error("Could not fetch the latest game.");
            }
            const data = await response.json();

            if (data.Response === 'False') {
                setErrorDisplay(data.error || 'Failed to fetch game of the week from API');
                setMainBackGroundList([])
            }
            setMainBackGroundList(data.results.filter((datum) => datum.background_image != null) || [])

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleEmail = (email: string) => {

        setEmailCart(email);
    }

    //Setting the background image
    useEffect(() => {

        fetchGameOfTheWeek();
    }, [])


    useEffect(() => {
        newUserId(emailCart);
    }, [emailCart]);

    // useEffect(() => {
    //     if (mainBackGroundList.length === 0) return;
    //
    //     // Set the background image every 10 seconds
    //     const interval = setInterval(() => {
    //         setBackgroundIndex((prevIndex) => (prevIndex + 1) % mainBackGroundList.length);
    //     }, 10000); // 10 seconds
    //
    //     return () => clearInterval(interval); // Cleanup on unmount
    // }, [mainBackGroundList]);
    //
    // useEffect(() => {
    //
    //         if (mainBackGroundList.length > 0) {
    //             const currentGame = mainBackGroundList[backgroundIndex];
    //             // @ts-ignore
    //             setBgImage(currentGame.background_image);
    //
    //         }
    //     }
    //     ,
    //     [mainBackGroundList, backgroundIndex]
    // )
    // ;

    return (
        <>
            <MatrixRain/>


            <div
                className="w-full h-screen p-8 md:p-12  bg-cover bg-center transition-all duration-500 ease-in-out relative z-0 text-white"
            >

                <div className="mb-8 md:mb-5 h-[80px] p-4  z-40 bg-black  ">
                    <Disclosure>
                        <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-end">
                                <div className="absolute inset-y-0 right-0 flex items-center  sm:hidden">
                                    {/* Mobile menu button*/}
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400
                                    hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                                        <span className="absolute -inset-0.5"/>
                                        <span className="sr-only">Open main menu</span>
                                        <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden"/>
                                        <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block"/>
                                    </DisclosureButton>
                                </div>
                                <div className="flex row w-full sm:items-stretch sm:justify-end">
                                    <div className="basis-1/3 shrink-0 items-center  sm:justify-self-center">
                                        <img
                                            alt="Your Company"
                                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                            className="h-8 w-auto"
                                        />
                                    </div>
                                    <div className="basis-2/3 hidden sm:ml-6 sm:block justify-items-end">
                                        <div className="flex space-x-4 indicator">
                                            {updatedNavigation.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className={item.name === 'Cart' ? 'indicator relative flex items-center' : 'flex items-center'}
                                                >
                                                    {item.name === 'Cart' && (
                                                        <span className="indicator-item badge badge-secondary badge-xs top-0 right-0">{emailCart?1:0}</span>
                                                    )}
                                                    <Link
                                                        to={item.href}
                                                        aria-current={item.current ? 'page' : undefined}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        onClick={() => {
                                                            setNavigation((prev) =>
                                                                prev.map((n) => ({
                                                                    ...n,
                                                                    current: n.name === item.name,
                                                                }))
                                                            );
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <DisclosurePanel className="sm:hidden bg-gray-900/25 z-50 relative">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {updatedNavigation.map((item) => (
                                    <div
                                        key={item.name}
                                        className={
                                            item.name === 'Cart'
                                                ? 'relative indicator flex items-start  w-full'
                                                : 'flex items-center  w-full'
                                        }
                                    >

                                        <Link
                                            to={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium w-full'
                                            )}
                                            onClick={() => {
                                                setNavigation((prev) =>
                                                    prev.map((n) => ({
                                                        ...n,
                                                        current: n.name === item.name,
                                                    }))
                                                );
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.name === 'Cart' && (
                                            <span className="indicator-item badge badge-secondary badge-xs top-1 right-1">{emailCart?1:0}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </DisclosurePanel>

                    </Disclosure>

                </div>

                <div className="z-0  w-full h-9/10 flex items-center justify-center relative">
                    <Outlet context={{emailCart, handleEmail, mainBackGroundList}}
                    />
                </div>

            </div>


        </>
    )
}

export default App
