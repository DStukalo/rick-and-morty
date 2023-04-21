import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../function/useDebounce';
import styles from './SearchItem.module.scss';

export function SearchItem() {
	const { search, page } = useParams();
	const [searchValue, setSearchValue] = useState(search || '');
	const [isTap, setIsTap] = useState(false);
	const navigate = useNavigate();
	const debouncedUpdateValueInput = useDebounce(searchValue as string, 500);

	function setNavigate() {
		if (page && !isTap) navigate(`/${page}/${searchValue}`);
		else navigate(`/1/${searchValue}`);
		setIsTap(false);
	}

	useEffect(() => {
		setNavigate();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedUpdateValueInput]);

	function handleChange(event: { target: HTMLInputElement }) {
		setSearchValue(event?.target.value);
		setIsTap(true);
	}

	return (
		<section className={styles.search}>
			<input type="search" placeholder="Filter by name..." onChange={handleChange} defaultValue={searchValue as string} />
		</section>
	);
}
