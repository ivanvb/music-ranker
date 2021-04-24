import React from 'react';
import Logo from './assets/music-ranker-logo.svg';
import SearchBar from './components/SearchBar';
import SongsPanelsGroup from './components/SongsPanelsGroup';

function App() {
    return (
        <main className="min-h-screen text-gray-100 container py-8 md:py-12 flex flex-col">
            <img
                src={Logo}
                alt="music ranker logo"
                className="h-16 mx-auto mb-2 md:mb-6 xl:mb-10"
            />
            <SearchBar />
            <SongsPanelsGroup />
        </main>
    );
}

export default App;
