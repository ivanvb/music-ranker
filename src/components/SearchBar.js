import React, { useState, useRef, useContext } from 'react';
import { useDebounce, useClickAway } from 'react-use';
import classnames from 'classnames';
import { BiReset } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';

import { TracksContext } from '../context/TracksContext';
import * as Deezer from '../lib/deezer';

const SearchBar = ({ className = '' }) => {
    const [, utils] = useContext(TracksContext);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [trackMode, setTrackMode] = useState(true);
    const searchAreaRef = useRef(null);

    const [,] = useDebounce(
        async () => {
            if (search) {
                const trackLists = await Deezer.search(search);

                if (trackMode) {
                    setResults(trackLists);
                } else {
                    const albums = trackLists
                        .map((track) => {
                            return {
                                id: track.album.id,
                                artist: track.artist,
                                title: track.album.title,
                                md5_image: track.album.md5_image,
                                type: 'album',
                            };
                        })
                        .reduce((acc, curr) => {
                            if (!!acc.find((album) => album.id === curr.id)) {
                                return acc;
                            } else {
                                return [...acc, curr];
                            }
                        }, []);

                    setResults(albums);
                }
            }
        },
        1000,
        [search, trackMode]
    );

    useClickAway(searchAreaRef, () => {
        setShowResults(false);
    });

    const containerClassnames = classnames(
        'w-full md:w-144 flex flex-col items-center mx-auto rounded-x relative rounded-2xl search-container',
        'focus-within:ring focus-within:ring-primary-dark-500',
        { 'rounded-b-none ring ring-primary-dark-500': results.length && showResults }
    );

    const inputClassnames = classnames(
        'w-full md:w-144 bg-base-fg text-gray-100 rounded-2xl py-1 md:py-2 px-4 md:px-4 tracking-wider rounded-r-none z-50',
        'focus:outline-none',
        { 'rounded-b-none': results.length && showResults },
        className
    );

    const toggleButtonClassname = classnames(
        'toggle-button bg-primary text-white rounded-2xl px-4 rounded-l-none z-40 focus:z-50 focus:outline-none focus:ring ring-primary',
        { 'rounded-b-none': results.length && showResults }
    );

    async function searchAlbumTracks(id) {
        const albumTracks = await Deezer.getAlbumTracks(id);
        for (const albumTrack of albumTracks) {
            if (!utils.hasTrackBeenAdded(albumTrack)) {
                utils.addTrack(albumTrack);
            }
        }
    }

    return (
        <div className={containerClassnames} ref={searchAreaRef}>
            <div className="flex relative w-full">
                <input
                    className={inputClassnames}
                    value={search}
                    placeholder={`Search for music`}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => setShowResults(true)}
                    onFocus={() => setShowResults(true)}
                />
                <button
                    className="bg-base-fg z-40 px-3 md:px-0 focus:z-50 focus:outline-none focus:ring ring-primary"
                    title="Close search"
                    onClick={() => {
                        setShowResults(false);
                    }}
                >
                    <CgClose color="white" size={24} />
                </button>
                <button
                    className="bg-base-fg z-40 px-3 hidden md:block focus:z-50 focus:outline-none focus:ring ring-primary"
                    onClick={utils.resetTracks}
                    title="Reset tracks"
                >
                    <BiReset color={'white'} size={24} />
                </button>
                <button
                    className={toggleButtonClassname}
                    onClick={() => setTrackMode((prev) => !prev)}
                >
                    {trackMode ? 'Track' : 'Album'}
                </button>
                {results.length > 0 && showResults && (
                    <div
                        className={`results ring ring-primary-dark-500 absolute z-20 top-full h-96 bg-base-fg rounded-b-xl border-t border-black overflow-y-auto overflow-x-hidden divide-y-2 divide-black w-full custom-scrollbar`}
                    >
                        {results.map((result, i) => {
                            const optionClassname = classnames(
                                'w-full relative overflow-hidden flex items-end overlfow-hidden focus:outline-none focus:bg-primary-dark-900',
                                i === 0 ? 'pb-2 h-22' : 'py-2 h-24',
                                { 'bg-purple-700': utils.hasTrackBeenAdded(result) }
                            );
                            return (
                                <button
                                    key={result.id}
                                    className={optionClassname}
                                    onClick={() => {
                                        if (result.type === 'track') {
                                            if (utils.hasTrackBeenAdded(result)) {
                                                utils.removeTrack(result);
                                            } else {
                                                utils.addTrack(result);
                                            }
                                        } else {
                                            searchAlbumTracks(result.id);
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
        </div>
    );
};

export default SearchBar;
