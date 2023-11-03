"use client"
import React from 'react';
import useMenuStore from '../store';



export default function Test() {
    const slides = useMenuStore(state => state.slides);
    const updateSlides = useMenuStore((state) => state.updateSlides);

    const handleChange = () => {
        updateSlides(5);
    };

    return (
        <div className="grid grid-cols-3 w-max" onClick={handleChange}>
            {slides}
        </div>
    );
};

