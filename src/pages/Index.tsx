import { useState, useEffect } from 'react';
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
  1, 
  2, 
  3,  
  4, 
  5, 
  6, 
  7, 
  8, 
  9, 
  10, 
];

const Index = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('card-enter');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            <h1 className="text-4xl md:text-4xl font-bold text-text-primary text-glow font-arial tracking-wider">
              meet :
            </h1>
          </div>

          {/* Character Card */}
          <div className="relative w-full max-w-md">
            {currentCharacter && (
              <CharacterCard
                character={currentCharacter}
                isVisible={true}
                animationClass={animationClass}
              />
            )}
          </div>

          {/* Navigation Indicators */}
          <div className="mt-8 flex items-center gap-6">
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
