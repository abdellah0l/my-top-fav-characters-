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
      <div className="relative w-full max-w-xs mx-auto">
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

        {/* Character Description */}
        <p className="text-lg leading-relaxed text-center text-text-secondary font-arial max-w-xs mx-auto">
          {character.description}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;