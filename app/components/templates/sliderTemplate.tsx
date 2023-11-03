import React from 'react';
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
                props.subtitle && (
                    <p className="text-sm font-medium uppercase tracking-widest text-pink-500" contentEditable={true} id="subtitle" suppressContentEditableWarning={true}>
                        {props.subtitle}
                    </p>
                )
            }

            {
                props.title && (
                    <p style={{ color: props.textcolor }} className="text-xl font-bold text-white sm:text-2xl" contentEditable={true} id="title" suppressContentEditableWarning={true}>
                        {props.title}
                    </p>
                )
            }
            <div className='mt-8'>
                {props.emoji && (
                    <p className="text-5xl text-white" contentEditable={true} id="emoji" suppressContentEditableWarning={true}>
                        {props.emoji}
                    </p>
                )}
            </div>

            <div className="mt-60">
                {props.content && (
                    <div>
                        <p style={{ color: props.textcolor }} className="text-sm text-white" contentEditable={true} id="content" suppressContentEditableWarning={true}>
                            {props.content}
                        </p>
                    </div>
                )}
            </div>
        </div >
    );
}

export default SliderTemplate;
