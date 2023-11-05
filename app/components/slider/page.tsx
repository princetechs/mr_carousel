"use client"
import React from 'react';
import SliderTemplate from '../templates/sliderTemplate';
import useMenuStore from '@/app/store';
import html2pdf from 'html2pdf.js';


const Slideview = (props: any) => {
    const apijson = props.newSlideContent;
    const [bgcolour, textcolor, accentcolor] = useMenuStore((state) => state.colors);

    const generatePDF = () => {
        const container = document.getElementById('contentToConvert');
        const options = {
            margin: 1,
            filename: apijson.LinkedIn_Carousel.topic ? apijson.LinkedIn_Carousel.topic : "aicarouselpdf", pagebreak: { after: '.breakpoint' }
            , jsPDF: { unit: 'in', format: 'legal', orientation: 'portrait' }, html2canvas: { scale: 2 },


        };
        const slides = document.querySelectorAll('#contentToConvert'); // Select all slide elements


        // Create a new instance of html2pdf
        const exporter = new html2pdf();
        let element = ""
        slides.forEach((slide) => {

            element += slide.innerHTML + `<div class='breakpoint'></div>`; // Append the inner HTML content of each slide
        });
        console.log(element)
        exporter.from(element).set(options).save().then(() => console.log('PDF downloaded!'));
    };

    return (
        <>
            <button className='btn btn-sm' onClick={generatePDF}>DownLoad</button>

            <div className="carousel rounded-box w-full space-x-1 ">
                {apijson &&
                    apijson.LinkedIn_Carousel &&
                    apijson.LinkedIn_Carousel.Slides.map((slide: any, index: number) => (
                        <div className="carousel-item w-1/2 contentToConvert" key={index} id="contentToConvert">
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
        </>
    );
};

export default Slideview;

