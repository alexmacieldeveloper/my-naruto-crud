import React, { useState } from "react";
import { Character } from "../types/Character";
import Button from "./Button";

interface NewCharacterModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSave: (newCharacter: Character) => void;
}

const NewCharacterModal: React.FC<NewCharacterModalProps> = ({
  isOpen,
  closeModal,
  onSave,
}) => {
  const [newCharacter, setNewCharacter] = useState<Character>({
    id: Date.now(),
    name: "",
    personal: {
      clan: [],
      affiliation: [],
      sex: "",
    },
    images: [],
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const imageInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "personal.clan") {
      setNewCharacter((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          clan: value ? value.split(",").map((item) => item.trim()) : [],
        },
      }));
    } else if (name === "personal.sex") {
     
      setNewCharacter((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          sex: value, 
        },
      }));
    } else if (name === "images") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          setImagePreview(base64Image);
          setNewCharacter((prev) => ({
            ...prev,
            images: [base64Image],
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewCharacter((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (
      !newCharacter.name ||
      !newCharacter.personal.clan.length ||
      !newCharacter.images.length
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    onSave(newCharacter);
    setNewCharacter({
      id: Date.now(),
      name: "",
      personal: {
        clan: [],
        affiliation: [],
        sex: "",
      },
      images: [],
    });

    if (imageInputRef.current) {
      imageInputRef.current.value = ""; 
    }

    closeModal();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4 text-orange-500 font-bold">Adicionar Novo Personagem</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome do Personagem"
          value={newCharacter.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="personal.clan"
          placeholder="Clã (separe por vírgulas)"
          value={newCharacter.personal.clan.join(", ")}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="personal.sex"
          placeholder="Gênero"
          value={newCharacter.personal.sex}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Input de Imagem */}
        <input
          type="file"
          name="images"
          ref={imageInputRef}
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Exibindo a imagem pré-visualizada */}
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Imagem do Personagem"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}

        <div className="flex justify-between">
            <Button
            onClick={handleSave}
            >
            Salvar
            </Button>
            <Button
            onClick={closeModal}
            variant="secondary"
            >
            Cancelar
            </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default NewCharacterModal;
