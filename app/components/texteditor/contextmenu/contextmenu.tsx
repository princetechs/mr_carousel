import React, { forwardRef } from 'react';

interface ContextMenuProps {
    style: React.CSSProperties;
    onBoldClick: (event: React.MouseEvent) => void;
    onItalicClick: (event: React.MouseEvent) => void;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
    ({ style, onBoldClick, onItalicClick }, ref) => (
        <div ref={ref} style={{ ...style }} className=" bg-white p-2 rounded shadow z-50">
            <button onMouseDown={onBoldClick} className="px-2 py-1 mr-2 bg-blue-500 text-white rounded">
                Bold
            </button>
            <button onMouseDown={onItalicClick} className="px-2 py-1 bg-green-500 text-white rounded">
                Italic
            </button>
        </div>
    )
);

export default ContextMenu;
