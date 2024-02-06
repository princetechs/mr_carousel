"use client"
import React from 'react';
interface ColorPaletteButtonProps {
    colors: string[];
    onClick: () => void;
}

const ColorPaletteButton: React.FC<ColorPaletteButtonProps> = ({ colors, onClick }) => {
    return (
        <button onClick={() => onClick()} className="flex items-center justify-center   rounded-lg  p-2 shadow-xl hover:bg-primary">
            {
                colors.map((color, innerIndex) => (
                    <span
                        key={innerIndex}
                        className={`z-${50 - innerIndex * 10} ${innerIndex === 0 ? '' : `-ml-2`} h-5 w-5 rounded-full`}
                        style={{ backgroundColor: color }}
                    >
                    </span>
                ))
            }
        </button>
    );
};

export default ColorPaletteButton;
