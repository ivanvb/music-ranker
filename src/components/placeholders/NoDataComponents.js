import { BsMusicNoteBeamed } from 'react-icons/bs';
import { AiFillTrophy } from 'react-icons/ai';
import { useMedia } from 'react-use';
import React from 'react';

const NoDataComponent = ({ Icon, text }) => {
    const isMed = useMedia('(max-width: 768px)');

    return (
        <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 w-10/12">
            {React.cloneElement(Icon, { color: 'white', size: isMed ? 128 : 164 })}
            <p className="text-center mt-4 lg:mt-6 tracking-widest text-xl">{text}</p>
        </div>
    );
};

export const NoTracksComponent = () => {
    return (
        <NoDataComponent
            Icon={<BsMusicNoteBeamed />}
            text="Your selected tracks will appear here"
        />
    );
};

export const NoRanksComponent = () => {
    return (
        <NoDataComponent Icon={<AiFillTrophy />} text="Your selected tracks will be ranked here" />
    );
};
