"use client"
import React from 'react';
import SliderTemplate from '../templates/sliderTemplate';
import useMenuStore from '@/app/store';

const Slideview = (props: any) => {
    const apijson = props.newSlideContent;
    const [bgcolour, textcolor, accentcolor] = useMenuStore((state) => state.colors);

    const generatePDF = () => {
        const options = {
            margin: 1,
            filename: apijson.LinkedIn_Carousel?.topic || 'aicarouselpdf',
            pagebreak: { after: '.breakpoint' },
            jsPDF: { unit: 'in', format: 'legal', orientation: 'portrait' },
            html2canvas: { scale: 2 },
        };

        const slidesdata = document.querySelectorAll('.contentToConvert');
        const element = Array.from(slidesdata).map((Curnt_slide) => Curnt_slide.innerHTML).join('<div class="breakpoint"></div>');

        try {
            import('html2pdf.js').then((html2pdf) => {
                html2pdf.default().from(element).set(options).save().then(() => console.log('PDF downloaded!'));
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div>
            {props.tockenValid && (
                <div className="alert alert-error bg-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>You have no credits to use</span>
                </div>
            )}

            <button className="my-2 top-2 btn btn-sm btn-primary" onClick={generatePDF}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                    <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
            </button>

            <div className="carousel w-auto  rounded-box space-x-1">
                {apijson?.LinkedIn_Carousel?.Slides.map((slide: any, index: number) => (
                    <div className="carousel-item w-1/2 contentToConvert" key={index}>
                        <SliderTemplate
                            accentcolor={accentcolor}
                            textcolor={textcolor}
                            bgcolour={bgcolour}
                            title={slide.title}
                            content={slide.content}
                            emoji={slide.emoji}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slideview;
