import FilterModal from "./components/ModalFilter";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
console.log('data', characters)
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();

        // const characterList = Array.isArray(data) ? data : [];

        setCharacters(data);
      } catch (error) {
        console.error("Erro ao carregar personagens:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchCharacters();
  }, []);
  const filterCharacters = () => {
    let filtered = characters;

    if (searchTerm) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedClan) {
      filtered = filtered.filter((character) => {
        const clan = character.personal?.clan;

        if (Array.isArray(clan)) {
          return clan.some((clanItem) =>
            clanItem.toLowerCase().includes(selectedClan.toLowerCase())
          );
        } else if (typeof clan === "string") {
          return clan.toLowerCase().includes(selectedClan.toLowerCase());
        }
        return false;
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
  };

  useEffect(() => {
    filterCharacters();
  }, [searchTerm, selectedClan, selectedVillage, selectedGender]);

  if (loading) {
    return <div className="p-6 text-center">Carregando...</div>;
  }

  return (
    <div className="p-6 text-center">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
};

export default App;
