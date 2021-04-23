import React, { useState, useRef } from 'react';
import { useDebounce, useClickAway } from 'react-use';
import classnames from 'classnames';

function generateAlbumImage(id, size) {
    return `https://cdns-images.dzcdn.net/images/cover/${id}/${size}x${size}-000000-80-0-0.jpg`;
}

const SearchBar = ({ className = '' }) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchAreaRef = useRef(null);

    const [,] = useDebounce(
        async () => {
            if (search) {
                window.DZ.api(`search?q=${search}`, (res) => {
                    setResults(res.data);
                    setShowResults(true);
                });
            }
        },
        1000,
        [search]
    );

    useClickAway(searchAreaRef, () => {
        setShowResults(false);
    });

    const inputClassnames = classnames(
        'w-full md:w-144 bg-base-fg text-gray-100 rounded-2xl py-1 md:py-2 px-4 md:px-4 tracking-wider',
        results.length && showResults ? 'rounded-b-none' : '',
        className
    );

    const scrollbarClassnames = classnames(
        'scrollbar-thin scrollbar-thumb-primary scrollbar-track-purple-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'
    );

    return (
        <div
            className="w-full md:w-144 flex flex-col items-center mx-auto"
            ref={searchAreaRef}
            onClick={() => setShowResults(true)}
        >
            <input
                className={inputClassnames}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {results.length > 0 && showResults && (
                <div
                    className={`h-96 bg-base-fg rounded-b-xl border-t border-black overflow-y-auto overflow-x-hidden divide-y-2 divide-black w-full ${scrollbarClassnames}`}
                >
                    {results.map((result, i) => {
                        const optionClassname = classnames(
                            'w-full relative overflow-hidden flex items-end overlfow-hidden',
                            i === 0 ? 'pb-2 h-22' : 'py-2 h-24'
                        );
                        return (
                            <button key={result.id} className={optionClassname}>
                                <img
                                    src={generateAlbumImage(result.md5_image, 500)}
                                    className="h-full w-20"
                                />
                                <p className="z-10 relative text-left ml-3">
                                    <span>{result.title}</span> <br />
                                    <span className="font-bold">{result.artist.name}</span>
                                </p>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
