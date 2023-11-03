"use client"
import React, { useState } from "react";
import SliderTemplate from "../templates/sliderTemplate";

export default function Slideview(props: any) {
    const [slidecontroll, setSlidecontroll] = useState("2")
    interface Slide {
        sldnum: number;
        type: string; // Define valid types
        title: string;
        content: string;
        emoji: string;
        Image?: string; // Optional property
        colour?: string; // Optional property
    }

    interface LinkedInCarousel {
        topic: string;
        totalSlide: number;
        description: string;
        emoji: string;
        Slides: Slide[];
    }

    interface jsondata {
        LinkedIn_Carousel: LinkedInCarousel;
    }

    const apijson: jsondata = props.newSlideContent;



    return (
        <>

            <div className="carousel  rounded-box w-full space-x-2 ">

                {
                    apijson && apijson.LinkedIn_Carousel && apijson.LinkedIn_Carousel.Slides.map((slide: any, index: number) => (
                        <div className="carousel-item w-1/2 " id={`slide${index}`} key={index}>
                            <SliderTemplate
                                title={slide.title}
                                content={slide.content}
                                emoji={slide.emoji}
                                bgcolour="bg-red-400"
                            />
                        </div>
                    ))
                }

            </div >

        </>

    );
}
