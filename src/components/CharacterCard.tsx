import { useEffect, useState } from 'react';


interface Character {
  id: number;
  rank: number;
  name: string;
  description: string;
  image: string;
}

interface CharacterCardProps {
  character: Character;
  isVisible: boolean;
  animationClass: string;
}

const CharacterCard = ({ character, isVisible, animationClass }: CharacterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [character.id]);

  if (!isVisible) return null;

  return (
    <div className={`character-card ${animationClass}`}>
      {/* Mobile Layout (stacked) */}
      <div className="block md:hidden w-full max-w-xs mx-auto">
        {/* Ranking Badge with Character Name */}
        <div className="ranking-glow rounded-full px-4 py-2 mb-3 mx-auto w-fit bg-primary">
          <span className="text-lg font-bold text-accent-foreground">
            #{character.rank} - {character.name}
          </span>
        </div>

        {/* Character Image Container */}
        <div className="relative mb-7 group w-[100%] mx-auto">
          <div className="absolute inset-0 bg-gradient-accent rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-xl shadow-card border border-card-border">
            {!imageLoaded && (
              <div className="aspect-[5/4] bg-card animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={character.image}
              alt={character.name}
              className={`w-full aspect-[4/5] object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Character Description - Scrollable on mobile */}
        <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
          <p className="text-lg leading-relaxed text-center text-text-secondary font-arial max-w-xs mx-auto px-2">
            {character.description}
          </p>
        </div>
      </div>

      {/* Desktop Layout (horizontal) */}
      <div className="hidden md:block w-full max-w-5xl mx-auto">
        {/* Ranking Badge with Character Name - Fixed at top */}
        <div className="ranking-glow rounded-full px-6 py-3 mb-8 mx-auto w-fit bg-primary">
          <span className="text-2xl font-bold text-accent-foreground">
            #{character.rank} - {character.name}
          </span>
        </div>

        {/* Content Container - Image left, Description right */}
        <div className="flex gap-12 items-start">
          {/* Left: Character Image */}
          <div className="flex-shrink-0 w-96">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-accent rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-xl shadow-card border border-card-border">
                {!imageLoaded && (
                  <div className="aspect-[4/5] bg-card animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={character.image}
                  alt={character.name}
                  className={`w-full aspect-[4/5] object-cover transition-all duration-700 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Right: Description - Same width as image */}
          <div className="flex-shrink-0 w-96">
            <div className="h-full">
              <p className="text-3xl leading-relaxed text-text-secondary font-arial">
                {character.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;