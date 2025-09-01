import { useState, useEffect, useRef } from 'react';
import CharacterCard from '@/components/CharacterCard';
import SwipeHandler from '@/components/SwipeHandler';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Import images and store in an array
import hashira from '@/assets/hashira.jpg';
import hiccup from '@/assets/hiccup.jpg';
import ishida from '@/assets/ishida.jpg';
import L from '@/assets/L.jpg';
import miles from '@/assets/miles.jpg';
import moriaty from '@/assets/moriaty.jpg';
import peter from '@/assets/peter.jpg';
import shinji from '@/assets/shinji.jpg';
import spidey from '@/assets/spidey.jpg';
import subaru from '@/assets/subaru.jpg';

import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export interface Character {
  id: number;
  rank: number;
  name: string;
  description: string;
  image: any;
}

const images = [
  hiccup, 
  ishida, 
  miles,  
  moriaty, 
  L, 
  hashira, 
  subaru, 
  shinji, 
  spidey, 
  peter,
];

const Index = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('card-enter');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());

  // Preload next image
  useEffect(() => {
    if (characters.length > 0) {
      const nextIndex = (currentIndex + 1) % characters.length;
      const nextImage = images[nextIndex];
      
      if (nextImage && !preloadedImages.has(nextIndex)) {
        const img = new Image();
        img.src = nextImage;
        img.onload = () => {
          setPreloadedImages(prev => new Set(prev).add(nextIndex));
        };
      }
    }
  }, [currentIndex, characters.length, preloadedImages]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const q = query(collection(db, "characters"), orderBy("rank", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        // Assign images by index
        const mapped = data.map((char: Character, idx: number) => ({
          ...char,
          image: images[idx] || '',
        }));
        setCharacters(mapped);
        
        // Preload first image
        if (mapped.length > 0) {
          const img = new Image();
          img.src = images[0];
          img.onload = () => {
            setPreloadedImages(prev => new Set(prev).add(0));
          };
        }
      } catch (err: any) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  const handleSwipeLeft = () => {
    if (isAnimating || characters.length === 0) return;
    setIsAnimating(true);
    setAnimationClass('card-slide-left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % characters.length);
      setAnimationClass('card-enter');
      setIsAnimating(false);
    }, 300);
  };

  const handleSwipeRight = () => {
    if (isAnimating || characters.length === 0) return;
    setIsAnimating(true);
    setAnimationClass('card-slide-right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
      setAnimationClass('card-enter');
      setIsAnimating(false);
    }, 300);
  };

  const currentCharacter = characters[currentIndex];
  console.log(currentCharacter);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <SwipeHandler onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          {/* Header */}
          <div className="mb-7">
            <h1 className="text-2xl md:text-4xl font-bold text-text-primary text-glow font-arial tracking-wider">
              meet :
            </h1>
          </div>

          {/* Character Card */}
          <div className="relative w-full max-w-md md:max-w-5xl">
            {currentCharacter && (
              <CharacterCard
                character={currentCharacter}
                isVisible={true}
                animationClass={animationClass}
              />
            )}
          </div>

          {/* Navigation Indicators - Mobile */}
          <div className="mt-8 md:hidden flex items-center gap-6">
            <button
              onClick={handleSwipeRight}
              disabled={isAnimating || characters.length === 0}
              className="p-3 rounded-full bg-card border border-card-border hover:bg-interactive hover:border-interactive-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6 text-text-primary" />
            </button>

            <div className="flex gap-2">
              {characters.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-6'
                      : 'bg-text-muted'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleSwipeLeft}
              disabled={isAnimating || characters.length === 0}
              className="p-3 rounded-full bg-card border border-card-border hover:bg-interactive hover:border-interactive-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6 text-text-primary" />
            </button>
          </div>

          {/* Navigation Arrows - Desktop (below description) */}
          <div className="hidden md:flex mt-8 items-center justify-center gap-8">
            <button
              onClick={handleSwipeRight}
              disabled={isAnimating || characters.length === 0}
              className="p-4 rounded-full bg-card border border-card-border hover:bg-interactive hover:border-interactive-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-8 h-8 text-text-primary" />
            </button>

            <div className="flex gap-2">
              {characters.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-text-muted'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleSwipeLeft}
              disabled={isAnimating || characters.length === 0}
              className="p-4 rounded-full bg-card border border-card-border hover:bg-interactive hover:border-interactive-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-8 h-8 text-text-primary" />
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="text-text-muted font-arial text-sm">
              Swipe, click arrows, or use keyboard ← → to navigate
            </p>
          </div>
        </div>
      </SwipeHandler>
    </div>
  );
};

export default Index;
