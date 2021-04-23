import React, { useState, useRef, useContext } from 'react';
import { useDebounce, useClickAway } from 'react-use';
import classnames from 'classnames';

import { TracksContext } from '../context/TracksContext';
import * as Deezer from '../lib/deezer';

const SearchBar = ({ className = '' }) => {
    const [, utils] = useContext(TracksContext);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchAreaRef = useRef(null);

    const [,] = useDebounce(
        async () => {
            if (search) {
                const trackLists = await Deezer.search(search);
                setResults(trackLists);
            }
        },
        1000,
        [search]
    );

    useClickAway(searchAreaRef, () => {
        setShowResults(false);
    });

    const containerClassnames = classnames(
        'w-full md:w-144 flex flex-col items-center mx-auto rounded-x relative'
    );

    const inputClassnames = classnames(
        'w-full md:w-144 bg-base-fg text-gray-100 rounded-2xl py-1 md:py-2 px-4 md:px-4 tracking-wider',
        'focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-70',
        results.length && showResults ? 'rounded-b-none' : '',
        className
    );

    const scrollbarClassnames = classnames(
        'scrollbar-thin scrollbar-thumb-primary scrollbar-track-purple-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'
    );

    return (
        <div
            className={containerClassnames}
            ref={searchAreaRef}
            onClick={() => setShowResults(true)}
            onFocus={() => setShowResults(true)}
        >
            <input
                className={inputClassnames}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {results.length > 0 && showResults && (
                <div
                    className={`absolute z-20 top-full h-96 bg-base-fg rounded-b-xl border-t border-black overflow-y-auto overflow-x-hidden divide-y-2 divide-black w-full ${scrollbarClassnames}`}
                >
                    {results.map((result, i) => {
                        const optionClassname = classnames(
                            'w-full relative overflow-hidden flex items-end overlfow-hidden focus:outline-none focus:bg-primary-dark',
                            i === 0 ? 'pb-2 h-22' : 'py-2 h-24',
                            { 'bg-purple-700': utils.hasTrackBeenAdded(result) }
                        );
                        return (
                            <button
                                key={result.id}
                                className={optionClassname}
                                onClick={() => {
                                    if (utils.hasTrackBeenAdded(result)) {
                                        utils.removeTrack(result);
                                    } else {
                                        utils.addTrack(result);
                                    }
                                }}
                            >
                                <img
                                    src={Deezer.generateAlbumImage(result.md5_image, 500)}
                                    className="h-full w-20"
                                    alt={`${result.title} by ${result.artist.name} album cover`}
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
