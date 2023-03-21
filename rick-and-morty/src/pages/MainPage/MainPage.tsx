/* eslint-disable react/jsx-no-bind */
import { useLoaderData, defer, Await } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { SearchItem } from '../../components/SearchItem/SearchItem';
import { Card } from '../../components/Card/Card';
import { sortByName } from '../../function/sortByName';
import { generateId } from '../../function/generateId';
import { Preloader } from '../../components/Preloader/Preloader';
import { CharacterData, DetailsData } from '../../types/types';
import styles from './MainPage.module.scss';
import { Pagination } from '../../components/Pagination/Pagination';

type UpdateCharactersData = {
	characters : CharacterData
}

export function MainPage() {
	const { characters } = useLoaderData() as UpdateCharactersData;
	const [newChar, setNewChar] = useState<CharacterData | null >(null);
	const [isLoading, setIsLoading] = useState(false);
	const [falseSearch, setFalseSearch] = useState('');

	useEffect(() => {
		document.title = 'Main Rick&Morty';
	}, []);

	async function fetchDataFromSearch(): Promise<void> {
		setFalseSearch('');
		setIsLoading(true);
		const url = sessionStorage.getItem('searchValue')
			? `https://rickandmortyapi.com/api/character?name=${sessionStorage.getItem('searchValue')}`
			: 'https://rickandmortyapi.com/api/character';
		const res = await fetch(url);
		if (res.status !== 200) {
			setIsLoading(false);
			setFalseSearch('We don`t find anything in db');
		} else {
			const result = sortByName(await res.json());
			setNewChar(result);
			setIsLoading(false);
		}
	}

	async function fetchDataFromPagination(link: string): Promise<void> {
		setFalseSearch('');
		setIsLoading(true);
		const res = await fetch(link);
		const result = sortByName(await res.json());
		setNewChar(result);
		setIsLoading(false);
	}

	return (
		<div className={styles.container}>
			<div className={styles.logo} />
			<SearchItem func={fetchDataFromSearch} />
			{isLoading ? (
				<Preloader />
			) : (
				<div className={styles.cards_container}>
					{falseSearch ? (
						<div className={styles.fail_block}>
							<p className={styles.fail_element}>
								{falseSearch}
							</p>
						</div>
					) : (
						<>
							<section className={styles.cards}>
								{newChar ? ((newChar as CharacterData).results.map((el) => (
									<Card
										key={generateId()}
										img={el.image}
										text={el.species}
										title={el.name}
										id={el.id}
									/>
								)))
									: (
										<Suspense fallback={<Preloader />}>
											<Await resolve={characters}>
												{
													(resolvedCharacters) => (
														<>
															{
																resolvedCharacters.results.map((el: DetailsData) => (
																	<Card
																		key={generateId()}
																		img={el.image}
																		text={el.species}
																		title={el.name}
																		id={el.id}
																	/>
																))
															}
														</>
													)
												}
											</Await>
										</Suspense>
									)}
							</section>
							<div className={styles.pagination}>
								{
									(newChar && newChar?.info.pages > 1) ? (
										<Pagination
											next={newChar.info.next}
											pages={newChar.info.pages}
											prev={newChar.info.prev}
											cb={fetchDataFromPagination}
										/>
									) : null
								}
							</div>
						</>
					)}
				</div>
			)}

		</div>
	);
}

async function getCharacters() {
	const url = sessionStorage.getItem('searchValue')
		? `https://rickandmortyapi.com/api/character?name=${sessionStorage.getItem('searchValue')}`
		: 'https://rickandmortyapi.com/api/character';
	const res = await fetch(url);
	const result = sortByName(await res.json());
	if (res.status !== 200) {
		const newUrl = 'https://rickandmortyapi.com/api/character';
		const newRes = await fetch(newUrl);
		return sortByName(await newRes.json());
	}

	return result;
}

export const mainLoader = async () => defer({ characters: getCharacters() });
