"use client"
import React, { Suspense, useState } from 'react';
import Sidebar from '../app/components/sidebar/page';

import SlideView from './components/slider/page';
import sampleData from '@/jsondb/sampledb.json';

export default function Home() {
  const [newSlideContent, setnewSlideContent] = useState(sampleData)
  async function generateCarousel(topic: string) {
    const apiMessage = {
      topic,
      slides: 3,
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
      let extractslide = JSON.parse(responseData.choices[0].message.content)
      console.log(extractslide)
      setnewSlideContent(extractslide);
      // return responseData;

    } catch (error) {
      console.error("API request error:", error);
    }

  }



  return (
    <Suspense>

      <div className='flex justify-start items-start'>
        {/* Sidebar */}
        <aside>

          <Sidebar generateclick={generateCarousel} />
        </aside>
        {/* Sidebar */}

        {/* Main Content */}
        <main className='container mx-8  mt-4 max-w-5xl sm:px-6 lg:px-6 flex items-center justify-center h-screen'>

          {newSlideContent && <SlideView newSlideContent={newSlideContent} />}

        </main>
        {/* Main Content */}
      </div>
    </Suspense>

  );
}
