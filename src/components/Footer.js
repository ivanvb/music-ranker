import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="container flex flex-col items-center">
            <hr className="border-gray-500 w-full" />
            <a href="https://github.com/ivanvb/music-ranker" className="mx-auto inline-block">
                <FaGithub
                    className="mt-6 mb-8 opacity-70 hover:opacity-90"
                    color="white"
                    size={36}
                />
            </a>
        </footer>
    );
};

export default Footer;
