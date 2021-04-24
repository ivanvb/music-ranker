import React, { useContext } from 'react';
import Logo from './assets/music-ranker-logo.svg';
import SearchBar from './components/SearchBar';
import SongsPanel from './components/SongsPanel';
import { TracksContext } from './context/TracksContext';

function App() {
    const [tracks, utils] = useContext(TracksContext);
    return (
        <main className="min-h-screen text-gray-100 container py-8 md:py-12 flex flex-col">
            <img
                src={Logo}
                alt="music ranker logo"
                className="h-16 mx-auto mb-2 md:mb-6 xl:mb-10"
            />
            <SearchBar />
            <div className="mt-6 grid grid-cols-2 gap-12 ">
                <SongsPanel tracks={tracks} deleteSong={utils.removeTrack} />
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
            </div>
        </main>
    );
}

export default App;
