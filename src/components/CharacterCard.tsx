import { Character } from "../types/Character";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      {character.images && character.images.length > 0 && (
        <img
          src={character.images[0]}
          alt={character.name}
          className="w-full h-40 object-cover mt-2 rounded"
        />
      )}
      <h2 className="text-lg font-bold">{character.name}</h2>
      <p>{character.personal.clan}</p>
    </div>
  );
};

export default CharacterCard;
