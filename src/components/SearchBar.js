import React, { useState } from 'react';
import { useDebounce } from 'react-use';

const SearchBar = ({ className = '' }) => {
    const [search, setSearch] = useState('');

    const [,] = useDebounce(
        () => {
            if (search) {
                console.log(search);
            }
        },
        1000,
        [search]
    );

    return (
        <input
            className={`${className} w-full md:w-144 bg-base-fg text-gray-100 rounded-2xl py-1 md:py-2 px-2 md:px-3 tracking-wider`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
};

export default SearchBar;
