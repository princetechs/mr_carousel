import React, { useState } from 'react'
import PalettePicker from './colors/palettepicker';
import useMenuStore from '../../store';

function Tabmenu() {
    const [activeTab, setActiveTab] = useState('General');
    const slides = useMenuStore((state) => state.slides);
    const updateSlides = useMenuStore((state) => state.updateSlides);

    const handleChange = (event: any) => {
        updateSlides(event.target.value);
    };
    const tabs = ['General', 'Colors', 'Tab 3'];

    const renderContent = () => {
        switch (activeTab) {
            case 'General':
                return (
                    <>
                        <label className="label">Slides to Use</label>
                        <input type="range" min={3} max={20} value={slides} onChange={handleChange} className="range range-xs" />
                        <p>{slides}</p>
                        <label className="label">Select Color Palette</label>

                        <PalettePicker />
                        <br />
                        <a
                            href="https://github.com/princetechs/mr_carousel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2  bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition duration-300"
                        >
                            <span className="text-gray-800 items-center">Github</span>
                        </a>
                    </>

                );
            case 'Colors':
                return (
                    <>
                    </>
                )
            // case 'Tab 3':
            //     return <div>Content for Tab 3</div>;
            // default:
            //     return null;
        }
    }

    return (
        <div>
            <div className="tabs mx-1 my-2">
                {tabs.map(tab => (
                    <a
                        key={tab}
                        className={`tab tab-lifted ${tab === activeTab ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </a>
                ))}
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    )
}

export default Tabmenu;
