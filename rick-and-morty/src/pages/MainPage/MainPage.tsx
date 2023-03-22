import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { SearchItem } from '../../components/SearchItem/SearchItem';
import { Card } from '../../components/Card/Card';
import { Preloader } from '../../components/Preloader/Preloader';
import { CharacterData } from '../../types/types';
import styles from './MainPage.module.scss';
import { Pagination } from '../../components/Pagination/Pagination';
import { useCharacters } from '../../store/store';

export function MainPage() {
	const {
		characters, loading, fetchCharacters, errorMessage, curPage, updateCurPage,
	} = useCharacters((state) => ({
		characters: state.characters,
		loading: state.loading,
		fetchCharacters: state.fetchCharacters,
		updateCurPage: state.updateCurPage,
		errorMessage: state.errorMessage,
		curPage: state.curPage,
	}), shallow);

	useEffect(() => {
		document.title = 'Main Rick&Morty';
		if (curPage) {
			fetchCharacters(curPage);
			updateCurPage(curPage);
		}	 else {
			fetchCharacters(
				sessionStorage.getItem('searchValue') ? `https://rickandmortyapi.com/api/character?name=${sessionStorage.getItem('searchValue')}`
					: 'https://rickandmortyapi.com/api/character',
			);
		}
	}, [curPage, fetchCharacters, updateCurPage]);

	return (
		<div className={styles.container}>
			<div className={styles.logo} />
			<SearchItem />
			{loading === true ? <Preloader /> : null}
			<div className={styles.cards_container}>
				<section className={styles.cards}>
					{characters && loading === false && errorMessage === '' ? ((characters as CharacterData).results.map((el) => (
						<Card
							key={el.name + el.id}
							img={el.image}
							text={el.species}
							title={el.name}
							id={el.id}
						/>
					)))
						: null}
					{
						loading === false && errorMessage !== '' ? (
							<div className={styles.fail_block}>
								<p className={styles.fail_element}>
									{errorMessage}
								</p>
							</div>
						) : null
					}
				</section>
				<div className={styles.pagination}>
					{
						(characters && loading === false && errorMessage === '' && (characters as CharacterData).info.pages > 1) ? (
							<Pagination
								next={(characters as CharacterData).info.next}
								pages={(characters as CharacterData).info.pages}
								prev={(characters as CharacterData).info.prev}
							/>
						) : null
					}
				</div>
			</div>
		</div>
	);
}
