import { create } from "zustand";
import { Character } from "../types/Character";

interface FavoritesStore {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (id: string) => void;
  updateFavorite: (character: Character) => void; // <-- Novo método
}

export const useFavorites = create<FavoritesStore>((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  
  addFavorite: (character) => set((state) => {
    const updatedFavorites = [...state.favorites, character];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
  }),
  
  removeFavorite: (id) => set((state) => {
    const updatedFavorites = state.favorites.filter((char) => char.id !== Number(id));
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
  }),

  updateFavorite: (character) => set((state) => {
    const updatedFavorites = state.favorites.map((fav) =>
      fav.id === character.id ? character : fav
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
  }),
}));
