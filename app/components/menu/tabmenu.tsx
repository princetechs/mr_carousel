import React, { useState } from 'react'
import PalettePicker from './colors/palettepicker';

function Tabmenu() {
    const [activeTab, setActiveTab] = useState('General');

    const tabs = ['General', 'Colors', 'Tab 3'];

    const renderContent = () => {
        switch (activeTab) {
            case 'General':
                return <div>Content for Tab 1</div>;
            case 'Colors':
                return (
                    <PalettePicker />
                )
            case 'Tab 3':
                return <div>Content for Tab 3</div>;
            default:
                return null;
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
