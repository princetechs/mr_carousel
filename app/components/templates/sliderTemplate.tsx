"use client"
import React from 'react';
import Editor from '../Editor/editor';
interface SliderTemplateProps {
    content?: string;
    title?: string;
    subtitle?: string;
    emoji?: string;
    bgcolour?: string;
    textcolor?: string;
    accentcolor?: string;
}

function SliderTemplate(props: SliderTemplateProps) {
    return (
        <div style={{ backgroundColor: props.bgcolour }}
            className={`relative p-8 sm:p-12 lg:p-16   bg-accent`}>


            {
                props.title && (
                    <div className="text-xl text-center font-bold text-white sm:text-2xl" style={{ color: props.textcolor }}>
                        <Editor content={props.title} />
                    </div>


                )
            }
            <div className='mt-8 '>
                {props.emoji && (
                    <p className="text-5xl  text-white" contentEditable={true} id="emoji" suppressContentEditableWarning={true}>
                        {props.emoji}
                    </p>
                )}
            </div>

            <div className="mt-60">
                {props.content && (
                    <div style={{ color: props.textcolor }} className="text-sm text-white" >

                        <Editor content={props.content} />

                    </div>
                )}
            </div>
        </div >
    );
}

export default SliderTemplate;
