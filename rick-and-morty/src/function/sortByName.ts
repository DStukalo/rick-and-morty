import { CharacterData } from '../types/types';

export function sortByName(array: CharacterData) {
	array.results.sort((a, b) => a.name.localeCompare(b.name));
	return array;
}
