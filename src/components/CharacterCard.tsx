import { Character } from "../types/Character";
import Button from "./Button";

interface CharacterCardProps {
  character: Character;
  toggleFavorite: () => void;
  isFavorite: boolean;
  onEdit: (character: Character) => void;
  onRemove: (characterId: string) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  toggleFavorite,
  isFavorite,
  onEdit,
  onRemove,
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

      {character.images?.length > 0 && (
        <img
          src={character.images[0]}
          alt={character.name}
          className="w-full h-40 object-cover mt-2 rounded"
        />
      )}

      <h2 className="text-xl font-semibold">{character.name}</h2>

      <p className="text-gray-500">
        Clan:{" "}
        {Array.isArray(character.personal.clan)
          ? character.personal.clan.join(", ")
          : character.personal.clan || "Desconhecido"}
      </p>

      <p className="text-gray-500">
        Aldeia: {character.personal.affiliation?.[0] || "Desconhecido"}
      </p>

      <p className="text-gray-500">Sexo: {character.personal.sex}</p>

      <div className="flex justify-between mt-3">
        <Button onClick={() => onEdit(character)} className="bg-blue-500">
          Editar
        </Button>

        <Button
          onClick={() => onRemove(character.id.toString())} // Passando o ID do personagem
          variant="danger"
        >
          Remover
        </Button>
      </div>
    </div>
  );
};

export default CharacterCard;
