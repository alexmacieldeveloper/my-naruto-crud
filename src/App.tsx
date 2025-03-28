import React, { useEffect, useState } from 'react';
import { getCharacters } from './services/api';
import { Character } from './types/Character';
import CharacterCard from './components/CharacterCard';

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

  if (loading) {
    return <div className="p-6 text-center">Carregando...</div>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">Personagens de Naruto</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
};

export default App;
