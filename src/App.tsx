import React, { useCallback, useEffect, useState } from "react";
import { getCharacters } from "./services/api";
import { Character } from "./types/Character";
import CharacterCard from "./components/CharacterCard";
import FilterModal from "./components/ModalFilter";
import { useFavorites } from "./store/useFavorites";
import EditCharacterModal from "./components/EditCharacterModal";
import FavoritesCharacters from "./components/FavoritesCharacters";
import SearchBar from "./components/SearchBar";
import Button from "./components/Button";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const [selectedClan, setSelectedClan] = useState<string>("");
  const [selectedVillage, setSelectedVillage] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [characterToEdit, setCharacterToEdit] = useState<Character | null>(null);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        const storedCharacters = JSON.parse(localStorage.getItem("customCharacters") || "[]");
  
        const allCharacters = [...data, ...storedCharacters];
  
        const uniqueCharacters = Array.from(
          new Map(allCharacters.map((character) => [character.id, character])).values()
        );
  
        setCharacters(uniqueCharacters);
        setFilteredCharacters(uniqueCharacters);
      } catch (error) {
        console.error("Erro ao carregar personagens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Função de filtro
  const filterCharacters = useCallback(() => {
    let filtered = characters;

    // Filtro por nome
    if (searchTerm) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por clã
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

    // Filtro por aldeia
    if (selectedVillage) {
      filtered = filtered.filter((character) =>
        character.personal?.affiliation?.some((village) =>
          village.toLowerCase().includes(selectedVillage.toLowerCase())
        )
      );
    }

    // Filtro por gênero
    if (selectedGender) {
      filtered = filtered.filter(
        (character) =>
          character.personal.sex?.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    setFilteredCharacters(filtered);
  }, [characters, searchTerm, selectedClan, selectedVillage, selectedGender]);

  // Aplicar filtro sempre que os filtros ou personagens mudarem
  useEffect(() => {
    filterCharacters();
  }, [filterCharacters]);

  const handleEditCharacter = (character: Character) => {
    setCharacterToEdit(character);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedCharacter = (updatedCharacter: Character) => {
    const updatedCharacters = characters.map((character) =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    );
    setCharacters(updatedCharacters);
    setFilteredCharacters(updatedCharacters);
    setIsEditModalOpen(false);
  };

  const handleRemoveCharacter = (character: Character) => {
    
    const updatedCharacters = characters.filter((char) => char.id !== character.id);
    setCharacters(updatedCharacters);
    setFilteredCharacters(updatedCharacters);

    
    removeFavorite(character.id.toString());


    const updatedFavorites = favorites.filter((fav) => fav.id !== character.id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    localStorage.setItem("customCharacters", JSON.stringify(updatedCharacters)); 
  };

  const toggleFavorite = (character: Character) => {
    if (favorites.some((fav) => fav.id === character.id)) {
      removeFavorite(character.id.toString());
    } else {
      addFavorite(character);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };


  if (loading) {
    return <div className="p-6 text-center">Carregando...</div>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">
        Personagens de Naruto
      </h1>
      <div className="flex justify-start mb-6">
        {/* Componente de busca */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <Button onClick={() => setIsModalOpen(true)}>Filtrar</Button>
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

      {/* Modal de Edição */}
      <EditCharacterModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        characterToEdit={characterToEdit}
        onSave={handleSaveEditedCharacter}
      />

      {/* Exibir Favoritos */}
      {favorites.length > 0 && <FavoritesCharacters onEdit={handleEditCharacter} onRemove={handleRemoveCharacter} toggleFavorite={toggleFavorite}/>}

      {/* Exibir personagens filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((character) => {
          const isFavorite = favorites.some((fav) => fav.id === character.id);
          
          return (
            <CharacterCard
              key={character.id}
              character={character}
              toggleFavorite={() => toggleFavorite(character)}
              isFavorite={isFavorite}
              onEdit={() => handleEditCharacter(character)}
              onRemove={() => handleRemoveCharacter(character)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
