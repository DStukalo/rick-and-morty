import { create } from 'zustand';
import { CharacterData } from '../types/types';
import { sortByName } from '../function/sortByName';

type CharactersState = {
	characters: CharacterData | object,
	loading: boolean,
	errorMessage: string,
	curPage: string | null,
	fetchCharacters: (arg0: string) => Promise<void>,
	updateCurPage: (arg0: string) => void
}

export const useCharacters = create<CharactersState>((set) => ({
	characters: {},
	loading: true,
	errorMessage: '',
	curPage: null,
	fetchCharacters: async (url: string) => {
		set({ loading: true });
		set({ errorMessage: '' });
		try {
			const res = await fetch(url);
			set({ characters: sortByName(await res.json()) });
		} catch (error) {
			set({ errorMessage: 'We don`t find anything in db' });
		} finally {
			set({ loading: false });
		}
	},
	updateCurPage: (link:string) => {
		set({ curPage: link });
	},
}));
