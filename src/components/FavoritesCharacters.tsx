import { Character } from "../types/Character";
import CharacterCard from "./CharacterCard";
import { useFavorites } from "../store/useFavorites";

const FavoritesCharacters = ({ onEdit }: { onEdit: (character: Character) => void }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  if (favorites.length === 0) return null; // Oculta a seção se não houver favoritos

  return (
    <div className="mt-7 mb-8">
      <p className="text-left text-2xl text-orange-500">Personagens Favoritos</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            toggleFavorite={() =>
              favorites.some((fav) => fav.id === character.id)
                ? removeFavorite(character.id.toString())
                : addFavorite(character)
            }
            isFavorite
            onEdit={() => onEdit(character)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesCharacters;
