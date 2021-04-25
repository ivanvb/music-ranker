import React from 'react';

const Square = ({ style }) => {
    return (
        <svg
            viewBox="0 0 621 621"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="y inner-square"
            style={style}
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M74 0C33.1309 0 0 33.1309 0 74V547C0 587.869 33.1309 621 74 621H547C587.869 621 621 587.869 621 547V74C621 33.1309 587.869 0 547 0H74ZM171 121C143.386 121 121 143.386 121 171V450C121 477.614 143.386 500 171 500H450C477.614 500 500 477.614 500 450V171C500 143.386 477.614 121 450 121H171Z"
                fill="#651FFF"
            />
        </svg>
    );
};

export default Square;
