import React, { useState } from 'react';

export const TracksContext = React.createContext();

export const TracksProvider = (props) => {
    const [tracks, setTracks] = useState([]);

    function addTrack(track) {
        setTracks((prev) => {
            return [...prev, track];
        });
    }

    function removeTrack(track) {
        setTracks((prev) => {
            return prev.filter((t) => t.id !== track.id);
        });
    }

    function hasTrackBeenAdded(track) {
        return !!tracks.find((t) => t.id === track.id);
    }

    function resetTracks() {
        setTracks([]);
    }

    return (
        <TracksContext.Provider
            value={[tracks, { addTrack, removeTrack, hasTrackBeenAdded, resetTracks }]}
        >
            {props.children}
        </TracksContext.Provider>
    );
};
