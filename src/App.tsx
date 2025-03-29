import React, { useCallback, useEffect, useState } from "react";
import { getCharacters } from "./services/api";
import { Character } from "./types/Character";
import CharacterCard from "./components/CharacterCard";
import FilterModal from "./components/ModalFilter";
import { useFavorites } from "./store/useFavorites";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const [selectedClan, setSelectedClan] = useState<string>("");
  const [selectedVillage, setSelectedVillage] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data);
        setFilteredCharacters(data);
      } catch (error) {
        console.error("Erro ao carregar personagens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const filterCharacters = useCallback(() => {
    let filtered = characters;

    if (searchTerm) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedClan) {
      filtered = filtered.filter((character) => {
        const clans = Array.isArray(character.personal?.clan)
          ? character.personal.clan
          : [character.personal?.clan]; // Garante que sempre seja um array
  
        return clans.some((clan) =>
          clan?.toLowerCase().includes(selectedClan.toLowerCase())
        );
      });
    }

    if (selectedVillage) {
      filtered = filtered.filter((character) =>
        character.personal?.affiliation?.some((village) =>
          village.toLowerCase().includes(selectedVillage.toLowerCase())
        )
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(
        (character) =>
          character.personal.sex?.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    setFilteredCharacters(filtered);
  }, [characters, searchTerm, selectedClan, selectedVillage, selectedGender]);

  useEffect(() => {
    filterCharacters();
  }, [filterCharacters]);

  if (loading) {
    return <div className="p-6 text-center">Carregando...</div>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">
        Personagens de Naruto
      </h1>
      <div className="flex justify-evenly mb-6">
        <input
          type="text"
          className="search-input p-2 border rounded w-1/2"
          placeholder="Buscar personagem..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white p-2 rounded w-24"
        >
          Filtrar
        </button>
      </div>
      <FilterModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedClan={selectedClan}
        setSelectedClan={setSelectedClan}
        selectedVillage={selectedVillage}
        setSelectedVillage={setSelectedVillage}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        applyFilters={filterCharacters}
      />
      {favorites.length > 0 && (
        <div className="mt-7 mb-8">
          <p className="text-left text-2xl text-orange-500">
            Personagens Favoritos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((character) => {
              const isFavorite = favorites.some(
                (fav) => fav.id === character.id
              );
              return (
                <CharacterCard
                  key={character.id}
                  character={character}
                  toggleFavorite={
                    isFavorite
                      ? () => removeFavorite(character.id.toString())
                      : () => addFavorite(character)
                  }
                  isFavorite={isFavorite}
                />
              );
            })}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((character) => {
          const isFavorite = favorites.some((fav) => fav.id === character.id);
          return (
            <CharacterCard
              key={character.id}
              character={character}
              toggleFavorite={
                isFavorite
                  ? () => removeFavorite(character.id.toString())
                  : () => addFavorite(character)
              }
              isFavorite={isFavorite}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
