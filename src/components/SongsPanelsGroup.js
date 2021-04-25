import React, { useContext, useState } from 'react';
import SongsPanel from './SongsPanel';
import { TracksContext } from '../context/TracksContext';
import { NoRanksComponent, NoTracksComponent } from '../components/placeholders/NoDataComponents';
import { useMedia } from 'react-use';

const SongPanels = () => {
    const [tracks, utils] = useContext(TracksContext);
    const [showRank, setShowRank] = useState(false);
    const isSmall = useMedia('(max-width: 767px)');

    return (
        <>
            <div className="px-2 block md:hidden">
                <div className="mt-6 flex space-x-6 w-full relative">
                    <button
                        className={`${showRank ? 'text-white' : 'text-primary'}`}
                        onClick={() => setShowRank(false)}
                    >
                        Songs
                    </button>
                    <button
                        className={`${showRank ? 'text-primary' : 'text-white'}`}
                        onClick={() => setShowRank(true)}
                    >
                        Ranked
                    </button>
                    <button className="right-0 absolute" onClick={utils.resetTracks}>
                        Reset
                    </button>
                </div>
                <hr className="border-white border mt-1 mb-2" />
            </div>
            <div className="flex mt-2 md:mt-6 flex-1 items-stretch space-x-8">
                {(!showRank || !isSmall) && (
                    <SongsPanel
                        tracks={tracks}
                        deleteSong={utils.removeTrack}
                        NoDataComponent={NoTracksComponent}
                    />
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
                        NoDataComponent={NoRanksComponent}
                    />
                )}
            </div>
        </>
    );
};

export default SongPanels;
