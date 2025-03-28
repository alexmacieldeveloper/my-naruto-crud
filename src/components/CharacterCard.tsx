import { Character } from "../types/Character";

interface CharacterCardProps {
  character: Character;
  toggleFavorite: () => void; 
  isFavorite: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  toggleFavorite,
  isFavorite,
}) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <button
          onClick={toggleFavorite} 
          className={`text-xl ${
            isFavorite ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          {isFavorite ? "★" : "☆"} 
        </button>
      </div>
      {character.images && character.images.length > 0 && (
        <img
          src={character.images[0]}
          alt={character.name}
          className="w-full h-40 object-cover mt-2 rounded"
        />
      )}
      <h2 className="text-lg font-bold">{character.name}</h2>
    </div>
  );
};

export default CharacterCard;
