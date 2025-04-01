import { create } from 'zustand';
import { Character } from '../types/Character';

interface FavoritesStore {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (id: string) => void;
}

export const useFavorites = create<FavoritesStore>((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"), 
  addFavorite: (character) => {
    set((state) => {
      const updatedFavorites = [...state.favorites, character];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
      return { favorites: updatedFavorites };
    });
  },
  removeFavorite: (id) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter((character) => character.id !== Number(id));
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
      return { favorites: updatedFavorites };
    });
  },
}));
