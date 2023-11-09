"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../app/components/sidebar/page';
import useMenuStore from './store';
import SlideView from './components/Slideview/page';
import sampleData from '@/jsondb/sampledb.json';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { setredis, getredis } from './Database/actions';

type ApiResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

const Home: React.FC = () => {
  const [newSlideContent, setNewSlideContent] = useState(sampleData);
  const [isLoading, setIsLoading] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const slides = useMenuStore((state) => state.slides);
  const [visitorIdfy, setVisitorIdfy] = useState("");
  const [tockenValid, setTokenValid] = useState(false);

  const checkUserCredits = async () => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setVisitorIdfy(result.visitorId);
      let credits = await getredis(result.visitorId, "Credits");

      if (credits === null) {
        console.log("new user", result.visitorId);
        await updateCredits(result.visitorId, 2);
      }

      setUserCredits(Number(credits));
    } catch (error) {
      console.error('FingerprintJS error:', error);
    }
  };

  useEffect(() => {
    checkUserCredits();
  }, []);

  const updateCredits = async (visitorId: string, newCredits: number) => {
    try {
      await setredis(visitorId, newCredits);
    } catch (error) {
      console.error('Error updating user credits:', error);
    }
  };

  const fetchApiData = async (apiMessage: any) => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiMessage),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  const generateCarousel = useCallback(async (topic: string) => {
    if (userCredits <= 0) {
      setTokenValid(true);

      setTimeout(() => {
        setTokenValid(false);
      }, 2000);

      return;
    }

    setIsLoading(true);

    try {
      const apiMessage = {
        topic,
        slides,
      };

      const responseData: ApiResponse = await fetchApiData(apiMessage);
      const extractSlide = JSON.parse(responseData.choices[0].message.content);

      setNewSlideContent(extractSlide);
      const updatedCredits = userCredits - 1;
      setUserCredits(updatedCredits);

      updateCredits(visitorIdfy, updatedCredits);
    } catch (error) {
      console.error('API request error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [slides, userCredits, visitorIdfy]);

  return (
    <div className="flex justify-start items-start">
      <aside>
        <Sidebar credits={userCredits} generateclick={generateCarousel} loading={isLoading} userCredits={userCredits} />
      </aside>
      <main className="container  mx-8 mt-4 max-w-5xl sm:px-6 lg:px-6 flex items-center justify-center h-screen">
        {newSlideContent && <SlideView tockenValid={tockenValid} newSlideContent={newSlideContent} />}
      </main>
    </div>
  );
};

export default Home;
