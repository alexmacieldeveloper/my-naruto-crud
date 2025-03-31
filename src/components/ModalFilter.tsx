import React from 'react';
import CharacterFilter from './CharacterFilter';
import Button from './Button';

interface FilterModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedClan: string;
  setSelectedClan: (clan: string) => void;
  selectedVillage: string;
  setSelectedVillage: (village: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  applyFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  closeModal,
  selectedClan,
  setSelectedClan,
  selectedVillage,
  setSelectedVillage,
  selectedGender,
  setSelectedGender,
  applyFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <CharacterFilter
          selectedClan={selectedClan}
          setSelectedClan={setSelectedClan}
          selectedVillage={selectedVillage}
          setSelectedVillage={setSelectedVillage}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
        <div className="flex justify-between mt-4">
          <Button             
            onClick={() => {
              applyFilters(); 
              closeModal(); 
            }}>Filtrar</Button>
          <Button
            onClick={closeModal}
            variant='secondary'
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
