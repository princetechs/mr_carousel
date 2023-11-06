"use client"
import React, { useState, useCallback } from 'react';
import Sidebar from '../app/components/sidebar/page';
import useMenuStore from './store';
import SlideView from './components/slider/page';
import sampleData from '@/jsondb/sampledb.json';
import test2db from '@/jsondb/test2db.json';
export default function Home() {
  const [newSlideContent, setNewSlideContent] = useState(sampleData);
  const [isLoading, setIsLoading] = useState(false);
  const slides = useMenuStore((state) => state.slides);

  const generateCarousel = useCallback(async (topic: string) => {
    setIsLoading(true);

    const apiMessage = {
      topic: topic,
      slides: slides,
    };

    try {
      const response = await fetch("http://localhost:3000/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiMessage),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      const extractSlide = JSON.parse(responseData.choices[0].message.content);
      setNewSlideContent(extractSlide);
    } catch (error) {
      console.error("API request error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [slides]);

  return (
    <div className="flex justify-start items-start">
      {/* Sidebar */}
      <aside>
        <Sidebar generateclick={generateCarousel} loading={isLoading} />
      </aside>
      {/* Sidebar */}

      {/* Main Content */}
      <main className="container mx-8 mt-4 max-w-5xl sm:px-6 lg:px-6 flex items-center justify-center h-screen">
        {newSlideContent && <SlideView newSlideContent={newSlideContent} />}
      </main>
      {/* Main Content */}
    </div>
  );
}
