import React, { useState, useEffect } from "react";
import { Character } from "../types/Character";

interface EditCharacterModalProps {
  isOpen: boolean;
  closeModal: () => void;
  characterToEdit: Character | null;
  onSave: (updatedCharacter: Character) => void;
}

const EditCharacterModal: React.FC<EditCharacterModalProps> = ({
  isOpen,
  closeModal,
  characterToEdit,
  onSave,
}) => {
  const [name, setName] = useState<string>("");
  const [clan, setClan] = useState<string>("");
  const [village, setVillage] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  // Preenche os dados quando o personagem a ser editado é selecionado
  useEffect(() => {
    if (characterToEdit) {
      setName(characterToEdit.name);

      // Garantir que 'clan' seja um array antes de usar 'join'
      const clans = Array.isArray(characterToEdit.personal.clan)
        ? characterToEdit.personal.clan
        : [characterToEdit.personal.clan];
      setClan(clans.join(", ")); // Convertendo para string separada por vírgulas

      // Garantir que 'affiliation' seja um array antes de usar 'join'
      const villages = Array.isArray(characterToEdit.personal.affiliation)
        ? characterToEdit.personal.affiliation
        : [characterToEdit.personal.affiliation];
      setVillage(villages.join(", ")); // Convertendo para string separada por vírgulas

      setGender(characterToEdit.personal.sex);

      // Definindo a imagem original
      if (characterToEdit.images && characterToEdit.images.length > 0) {
        setImage(null); // Limpa o estado de imagem, pois o usuário pode carregar uma nova imagem.
      }
    }
  }, [characterToEdit]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file); // Salva a nova imagem no estado
    }
  };

  const handleSave = () => {
    if (!name || !clan || !village || !gender) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    const updatedCharacter: Character = {
      ...characterToEdit!,
      name,
      personal: {
        ...characterToEdit!.personal,
        clan: clan.split(",").map((c) => c.trim()), // Convertendo de volta para array
        affiliation: village.split(",").map((v) => v.trim()), // Convertendo de volta para array
        sex: gender,
      },
      images: image ? [URL.createObjectURL(image)] : characterToEdit!.images,
    };

    onSave(updatedCharacter);
    closeModal();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-96 mx-auto mt-20 p-4 bg-white rounded-md overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl mb-4">Editar Personagem</h2>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Imagem
          </label>
          <input
            type="file"
            id="image"
            className="mt-1 block w-full text-sm text-gray-700 file:border file:rounded file:bg-orange-500 file:text-white"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <div className="mt-2">
              <p className="text-gray-600">Imagem selecionada:</p>
              <img src={URL.createObjectURL(image)} alt="Imagem do personagem" className="w-32 h-32 object-cover mt-2" />
            </div>
          )}
        </div>

        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Clan"
          value={clan}
          onChange={(e) => setClan(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Aldeia"
          value={village}
          onChange={(e) => setVillage(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Gênero"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <div className="flex justify-between">
          <button onClick={closeModal} className="bg-gray-300 p-2 rounded">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-orange-500 text-white p-2 rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCharacterModal;
