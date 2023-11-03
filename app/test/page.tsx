"use client"
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { createEditor, Transforms, Text, Node } from 'slate';
import { Slate, Editable, withReact, RenderLeafProps } from 'slate-react';
import ContextMenu from '../components/texteditor/contextmenu/contextmenu';

interface CustomLeaf extends Text {
    bold?: boolean;
    italic?: boolean;
    type?: string;
}

const initialValue: Node[] = [
    {
        children: [
            { text: 'A line of text in a paragraph.' },
        ],
    },
];

const Home: React.FC = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState<Node[]>(initialValue);
    const contextMenuRef = useRef<HTMLDivElement>(null);

    const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
        const customLeaf = leaf as CustomLeaf;

        if (customLeaf.bold) {
            return <strong {...attributes}>{children}</strong>;
        }

        if (customLeaf.italic) {
            return <em {...attributes}>{children}</em>;
        }

        return <span {...attributes}>{children}</span>;
    };

    const handleBoldClick = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        Transforms.setNodes<CustomLeaf>(
            editor,
            { bold: true },
            { match: Text.isText, split: true }
        );
    }, [editor]);

    const handleItalicClick = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        Transforms.setNodes<CustomLeaf>(
            editor,
            { italic: true },
            { match: Text.isText, split: true }
        );
    }, [editor]);

    const handleContextMenu = useCallback((event: React.MouseEvent) => {
        console.log("first");
        event.preventDefault();
        if (contextMenuRef.current) {
            contextMenuRef.current.style.top = `${event.clientY}px`;
            contextMenuRef.current.style.left = `${event.clientX}px`;
            contextMenuRef.current.style.display = 'block';
        }
    }, [contextMenuRef]);

    const closeContextMenu = useCallback(() => {
        if (contextMenuRef.current) {
            contextMenuRef.current.style.display = 'none';
        }
    }, [contextMenuRef]);

    const slectnow = (event: React.MouseEvent) => {
        console.log("selctnow")
    }
    return (
        <div>
            <ContextMenu ref={contextMenuRef} style={{ display: 'none', position: 'absolute', backgroundColor: 'white' }} onBoldClick={handleBoldClick} onItalicClick={handleItalicClick} />
            <Slate editor={editor} initialValue={value} onChange={value => setValue(value)}>
                <Editable renderLeaf={renderLeaf} onContextMenu={handleContextMenu}
                    onSelect={slectnow} onClick={closeContextMenu} />
            </Slate>
        </div>
    );
};

export default Home;
