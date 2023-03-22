import { useEffect, useState } from 'react';
import styles from './SearchItem.module.scss';
import { useDebounce } from '../../function/useDebounce';
import { useCharacters } from '../../store/store';

export function SearchItem() {
	const { fetchCharacters, updateCurPage } = useCharacters((state) => ({
		fetchCharacters: state.fetchCharacters,
		updateCurPage: state.updateCurPage,
	}));
	const [searchValue, setSearchValue] = useState(sessionStorage.getItem('searchValue') || '');
	const debouncedUpdateValueInput = useDebounce(searchValue as string, 500);

	useEffect(() => {
		if (!sessionStorage.getItem('searchValue')) updateCurPage('');
		fetchCharacters(sessionStorage.getItem('searchValue') ? `https://rickandmortyapi.com/api/character?name=${sessionStorage.getItem('searchValue')}`
			: 'https://rickandmortyapi.com/api/character');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedUpdateValueInput]);

	function handleChange(event: { target: HTMLInputElement }) {
		sessionStorage.setItem('searchValue', event?.target.value);
		setSearchValue(sessionStorage.getItem('searchValue') || '');
	}

	return (
		<div className={styles.search}>
			<input type="search" placeholder="Filter by name..." onChange={handleChange} defaultValue={searchValue as string} />
		</div>
	);
}
