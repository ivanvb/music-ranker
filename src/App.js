import React, { useContext } from 'react';
import Logo from './assets/music-ranker-logo.svg';
import SearchBar from './components/SearchBar';
import SongsPanel from './components/SongsPanel';
import { TracksContext } from './context/TracksContext';

function App() {
    const [tracks] = useContext(TracksContext);
    return (
        <main className="min-h-screen text-gray-100 container py-8 md:py-12 flex flex-col">
            <img
                src={Logo}
                alt="music ranker logo"
                className="h-16 mx-auto mb-2 md:mb-6 xl:mb-10"
            />
            <SearchBar />
            <div className="mt-6 flex flex-col h-full flex-1">
                <SongsPanel tracks={tracks} />
            </div>
        </main>
    );
}

export default App;
