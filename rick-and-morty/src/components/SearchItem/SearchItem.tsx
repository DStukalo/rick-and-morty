import { useEffect, useState } from 'react';
import styles from './SearchItem.module.scss';
import { useDebounce } from '../../function/useDebounce';

export function SearchItem(props: { func: () => Promise<void> }) {
	const { func } = props;
	const [searchValue, setSearchValue] = useState(sessionStorage.getItem('searchValue') || '');
	const debouncedUpdateValueInput = useDebounce(searchValue as string, 500);

	useEffect(() => {
		func();
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
