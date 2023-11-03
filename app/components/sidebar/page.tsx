"use client"
// import usePersonStore from "@/app/store"
import React, { useState } from 'react';
import PalettePicker from '@/app/components/menu/colors/palettepicker';
import Tabmenu from '../menu/tabmenu';
export default function Sidebar({ generateclick }: any) {

    // const increasePopulation = useStore(state => state.increasePopulation)

    const [inputData, setInputData] = useState('');

    function handleGenerateClick() {
        // Call the generateclick function and pass the inputData when the "Generate" button is clicked
        generateclick(inputData);
    }

    return (
        <div className="drawer xl:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side bg-base-200">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    />
                    <button className="btn btn-primary mt-2" onClick={handleGenerateClick}>
                        ✨ Generate
                    </button>

                    <Tabmenu />
                </ul>
            </div>
        </div>
    );
}



