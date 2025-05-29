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
        <div className="relative w-full max-w-xs mx-auto">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="min-w-20 max-w-40 bg-blue-600 py-2 px-2 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-sm sm:text-base"
            >
                {optionSettings.selectedOption}
            </button>

            {isOpen && (
                <div className="absolute z-10 w-40 mt-1 bg-gray-800 border border-gray-700 rounded shadow-md">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="w-full p-2 border-b border-gray-600 bg-gray-700 text-white placeholder-gray-300 outline-none"
                    />
                    <ul className="max-h-48 overflow-y-auto text-white">
                        <li
                            onClick={() => handleSelect('All')}
                            className="p-2 hover:bg-gray-600 cursor-pointer"
                        >
                            All
                        </li>
                        {genres.length > 0 ? (
                            filteredOptions.map((option: any, index: any) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(option.name)}
                                    className="p-2 hover:bg-gray-600 cursor-pointer"
                                >
                                    {option.name}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-400">No options found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
