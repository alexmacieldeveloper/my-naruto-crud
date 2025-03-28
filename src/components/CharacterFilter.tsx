import React from 'react';

interface CharacterFilterProps {
  selectedClan: string;
  setSelectedClan: (clan: string) => void;
  selectedVillage: string;
  setSelectedVillage: (village: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
}

const CharacterFilter: React.FC<CharacterFilterProps> = ({
  selectedClan,
  setSelectedClan,
  selectedVillage,
  setSelectedVillage,
  selectedGender,
  setSelectedGender,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="clan" className="block text-sm font-medium text-gray-700">
          Clã
        </label>
        <select
          id="clan"
          className="w-full p-2 border rounded"
          value={selectedClan}
          onChange={(e) => setSelectedClan(e.target.value)}
        >
          <option value="">Selecione o clã</option>
          <option value="Uchiha">Uchiha</option>
          <option value="Senju">Senju</option>
          <option value="Uzumaki">Uzumaki</option>
          <option value="Hatake">Hatake</option>
          <option value="Sarutobi">Sarutobi</option>
        </select>
      </div>

      <div>
        <label htmlFor="village" className="block text-sm font-medium text-gray-700">
          Aldeia
        </label>
        <select
          id="village"
          className="w-full p-2 border rounded"
          value={selectedVillage}
          onChange={(e) => setSelectedVillage(e.target.value)}
        >
          <option value="">Selecione a aldeia</option>
          <option value="Konohagakure">Konohagakure</option>
          <option value="Otogakure">Otogakure</option>
          <option value="Akatsuki">Akatsuki</option>
        </select>
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Sexo
        </label>
        <select
          id="gender"
          className="w-full p-2 border rounded"
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          <option value="">Selecione o sexo</option>
          <option value="Male">Masculino</option>
          <option value="Female">Feminino</option>
        </select>
      </div>
    </div>
  );
};

export default CharacterFilter;
