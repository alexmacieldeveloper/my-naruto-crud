import axios from 'axios';
import { Character } from '../types/Character';

const API_URL = 'https://dattebayo-api.onrender.com';

interface ApiResponse {
  characters: Character[]; 
  currentPage: number;
  pageSize: number;
  total: number;
}

export const getCharacters = async (): Promise<Character[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_URL}/characters`);

    return response.data.characters ?? []; 
  } catch (error) {
    console.error("Erro ao buscar os personagens:", error);
    return [];
  }
};
