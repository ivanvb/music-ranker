import React from 'react';
import * as Deezer from '../lib/deezer';

const SongsPanel = ({ tracks, showRank }) => {
    return (
        <div className="custom-scrollbar bg-base-fg rounded-lg grid grid-cols-3 p-4 h-full w-full flex-1 overflow-y-auto max-h-144 gap-8">
            {tracks.map((track, i) => {
                return (
                    <div
                        key={i}
                        className="h-48 w-full bg-cover backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 rounded-xl shadow relative z-0"
                        style={{
                            backgroundImage: `url("${Deezer.generateAlbumImage(
                                track.md5_image,
                                600
                            )}")`,
                        }}
                    >
                        <div className="absolute h-full w-full bg-gradient-to-t from-black via-black to-transparent z-0 pointer-events-none rounded-xl opacity-50"></div>
                        <div className="z-10 relative h-full flex flex-col rounded-xl justify-end p-3">
                            <p className="text-sm">{track.title}</p>
                            <p className="font-bold">{track.artist.name}</p>
                        </div>
                        {showRank && (
                            <div className="z-40 h-6 w-6 rounded-full absolute left-0 top-0 bg-gradient-to-t from-primary to-purple-500 flex justify-center items-center text-center transform -translate-x-1/3 -translate-y-1/4 text-xs">
                                {i + 1}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SongsPanel;
