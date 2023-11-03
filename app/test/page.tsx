"use client"
import React from 'react';
import ColorPaletteButton from '@/app/components/menu/colors/colorpalette';

const ColorPalettes: React.FC = () => {
    const palettes: string[][] = [
        ['#FF0000', '#00FF00', '#0000FF'],
        ['#FFFF00', '#00FFFF', '#FF00FF'],
        ['#FFFF00', '#00FFFF', '#FF00FF'],
        ['#FFFF00', '#00FFFF', '#FF00FF'],
        ['#FFFF00', '#00FFFF', '#FF00FF'],

        // Add more palettes as needed
    ];

    const handlePaletteClick = (colors: string[]) => {
        console.log(colors);
        // Handle the color selection here
    };

    return (
        <div className="grid grid-cols-3 w-max">
            {
                palettes.map((colors: string[], indexin: number) => (
                    <ColorPaletteButton key={indexin} colors={colors} onClick={() => handlePaletteClick(colors)} />
                ))
            }
        </div>
    );
};

export default ColorPalettes;
