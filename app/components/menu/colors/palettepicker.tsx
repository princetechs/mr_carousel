"use client"
import React from 'react';
import ColorPaletteButton from '@/app/components/menu/colors/colorpalette';
import useMenuStore from '@/app/store';
const PalettePicker: React.FC = () => {
    const palettes: string[][] = [
        ['#EB546F', '#FFFFFF', '#220257'],
        ['#1a1d29', '#e6e6e6', '#c5c5ff'],
        ['#B36BF7', '#FFFFFF', '#000000'],
        ['#ffffff', '#231b54', '#ee834e'],
        ['#F1EDDC', '#474747', '#F8AFA6'],
        ['#56a3f5', '#ffffff', '#06247f'],
        ['#F9E2D2', '#2C2C2C', '#8491C3'],
        ['#dde5e7', '#67727e', '#d4674c'],
        ['#F2D7EE', '#262626', '#4F4A7C'],
        ['#D6DBB2', '#3C3C3C', '#e88411'],
        ['#f6f0f0', '#0567a8', '#60e3d5'],
        ['#1a223a', '#e4e4eb', '#ffaf87'],
        ['#280647', '#b3aee9', '#96f7d2'],
        ['#2d2d2d', '#f5f5f5', '#ffcc66'],
        ['#EE8271', '#FFFFFF', '#4D0A65'],
        ['#1e1e1e', '#f2f2f2', '#52c3c9']

        // Add more palettes as needed
    ];


    const colors = useMenuStore((state) => state.colors)
    const updateColors = useMenuStore((state) => state.updateColors)
    // Handle the color selection here
    const handlePaletteClick = (colors: string[]) => {
        updateColors(colors)
    };

    return (
        <div className="grid grid-cols-4 w-max  ">
            {
                palettes.map((colors: string[], indexin: number) => (
                    <ColorPaletteButton key={indexin} colors={colors} onClick={() => handlePaletteClick(colors)} />
                ))
            }
        </div>
    );
};

export default PalettePicker;
