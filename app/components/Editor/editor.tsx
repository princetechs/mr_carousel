"use client"
import {
    BubbleMenu,
    EditorContent,
    useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import React, { ChangeEvent, MouseEvent } from 'react'

interface TextEditorProps {
    content?: string;
}

export default function Editor({ content = "" }: TextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color.configure({
                types: ['textStyle'],
            })
        ],
        content,
    })

    const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        editor?.chain().focus().setColor(event.target.value).run();
    }

    const handleBoldClick = (event: MouseEvent<HTMLButtonElement>) => {
        editor?.chain().focus().toggleBold().run();
    }

    const handleItalicClick = (event: MouseEvent<HTMLButtonElement>) => {
        editor?.chain().focus().toggleItalic().run();
    }

    const handleStrikeClick = (event: MouseEvent<HTMLButtonElement>) => {
        editor?.chain().focus().toggleStrike().run();
    }

    return (
        <>
            {editor && <BubbleMenu className="bubble-menu  p-1 shadow-xl rounded-md" tippyOptions={{ duration: 100 }} editor={editor}>
                <input
                    className='bg-black'
                    type="color"
                    onInput={handleColorChange}
                    value={editor.getAttributes('textStyle').color}
                    data-testid="setColor"
                />
                <button
                    onClick={handleBoldClick}
                    className={`p-1 ${editor.isActive('bold') ? 'bg-blue-500 text-white' : ''}`}
                >
                    B
                </button>
                <button
                    onClick={handleItalicClick}
                    className={`p-1 ${editor.isActive('italic') ? 'bg-blue-500 text-white' : ''}`}
                >
                    I
                </button>
                <button
                    onClick={handleStrikeClick}
                    className={`p-1 ${editor.isActive('strike') ? 'bg-blue-500 text-white' : ''}`}
                >
                    S
                </button>
            </BubbleMenu>}

            <EditorContent editor={editor} />
        </>
    )
}
