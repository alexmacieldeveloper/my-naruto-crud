import { create } from 'zustand';
import { Character } from '../types/Character';

interface FavoritesStore {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (id: string) => void;
}

export const useFavorites = create<FavoritesStore>((set) => ({
  favorites: [],
  addFavorite: (character) => set((state) => ({
    favorites: [...state.favorites, character]
  })),
  removeFavorite: (id) => set((state) => ({
    favorites: state.favorites.filter((character) => character.id !== Number(id))
  }))
}));
