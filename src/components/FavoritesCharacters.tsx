import { Character } from "../types/Character";
import CharacterCard from "./CharacterCard";
import { useFavorites } from "../store/useFavorites";

interface FavoritesCharactersProps {
  onEdit: (character: Character) => void;
  onRemove: (character: Character) => void;
  toggleFavorite: (character: Character) => void;
}

const FavoritesCharacters: React.FC<FavoritesCharactersProps> = ({ onEdit, onRemove, toggleFavorite }) => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) return null;

  return (
    <div className="mt-7 mb-8">
      <p className="text-left text-2xl text-orange-500 font-bold">Personagens Favoritos</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {favorites.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            toggleFavorite={() => toggleFavorite(character)
            }
            isFavorite
            onEdit={() => onEdit(character)}
            onRemove={() => onRemove(character)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesCharacters;
