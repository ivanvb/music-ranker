import React, { useContext, useState } from 'react';
import SongsPanel from './SongsPanel';
import { TracksContext } from '../context/TracksContext';
import { useMedia } from 'react-use';

const SongPanels = () => {
    const [tracks, utils] = useContext(TracksContext);
    const [showRank, setShowRank] = useState(false);
    const isSmall = useMedia('(max-width: 478px)');

    return (
        <>
            <div className="px-2 block md:hidden">
                <div className="mt-6 flex space-x-6">
                    <button onClick={() => setShowRank(false)}>Songs</button>
                    <button onClick={() => setShowRank(true)}>Ranked</button>
                </div>
                <hr className="border-white border mt-1 mb-2" />
            </div>
            <div className="flex mt-2 md:mt-6 flex-1 items-stretch space-x-8">
                {(!showRank || !isSmall) && (
                    <SongsPanel tracks={tracks} deleteSong={utils.removeTrack} />
                )}
                {(showRank || !isSmall) && (
                    <SongsPanel
                        tracks={[...tracks].sort((a, b) => {
                            if (a.rank > b.rank) {
                                return -1;
                            } else if (a.rank < b.rank) {
                                return 1;
                            } else {
                                return 0;
                            }
                        })}
                        showRank
                    />
                )}
            </div>
        </>
    );
};

export default SongPanels;