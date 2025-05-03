// @ts-nocheck
import { useState } from 'react';


type Genre = {
    id: string;
    name: string;
};

type GenresProps = {
    genres: Genre[];
};
type DropdownProps = {
    genres: GenresProps;
    optionSettings: {
        selectedOption: string,
        setSelectedOption: (value: string) => void;
    };
};



const Dropdown = ({ genres, optionSettings }: DropdownProps) => {

    const { selectedOption, setSelectedOption } = optionSettings;
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    // @ts-ignore
    const filteredOptions = genres
        .sort((a:any, b:any) => a.name.localeCompare(b.name))
        .filter((option:any) =>
        // console.log(option)
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="relative w-64 mx-auto mt-10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-24 p-2 border rounded bg-black shadow text-left line-clamp-1"
            >
                {optionSettings.selectedOption}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-black border rounded shadow">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="w-full p-2 border-b outline-none"
                    />
                    <ul className="max-h-48 overflow-y-auto">
                        <li onClick={() => handleSelect('All')}
                            className="p-2 hover:bg-gray-100 cursor-pointer">All</li>
                        {genres.length > 0 ? (
                            filteredOptions.map((option:any, index:any) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(option.name)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {option.name}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No options found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
