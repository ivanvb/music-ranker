import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TracksProvider } from './context/TracksContext';
import './css/tailwind.build.css';

ReactDOM.render(
    <React.StrictMode>
        <TracksProvider>
            <App />
        </TracksProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
