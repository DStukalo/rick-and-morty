/* eslint-disable max-len */
import { Suspense, useEffect } from 'react';
import {
	Await, LoaderFunction, defer, useLoaderData,
} from 'react-router-dom';
import { SearchItem } from '../../components/SearchItem/SearchItem';
import { Card } from '../../components/Card/Card';
import { Preloader } from '../../components/Preloader/Preloader';
import { CharacterData, DetailsData } from '../../types/types';
import styles from './MainPage.module.scss';
import { Pagination } from '../../components/Pagination/Pagination';
import { BASE_URL } from '../../consts/consts';
import { sortByName } from '../../function/sortByName';

type UpdateCharactersData = {
	newCharacters : CharacterData
}

export function MainPage() {
	const { newCharacters } = useLoaderData() as UpdateCharactersData;

	useEffect(() => {
		document.title = 'Main | Rick&Morty';
	}, []);

	return (
		<article className={styles.container}>
			<div className={styles.logo} />
			<SearchItem />
			<div className={styles.cards_container}>
				<section className={styles.cards}>
					<Suspense fallback={<Preloader />}>
						<Await resolve={newCharacters}>
							{
								(resolvedCharacters) => {
									if (typeof resolvedCharacters === 'string') return <p>{resolvedCharacters}</p>;
									return (
										<>
											{
												resolvedCharacters.results.map((el: DetailsData) => (
													<Card
														key={el.id}
														img={el.image}
														text={el.species}
														title={el.name}
														id={el.id}
													/>
												))
											}
											<div className={styles.pagination}>
												{
													(resolvedCharacters && (resolvedCharacters as CharacterData).info.pages > 1) ? (
														<Pagination
															next={(resolvedCharacters as CharacterData).info.next}
															pages={(resolvedCharacters as CharacterData).info.pages}
															prev={(resolvedCharacters as CharacterData).info.prev}
														/>
													) : null
												}
											</div>
										</>
									);
								}
							}
						</Await>
					</Suspense>
				</section>
			</div>
		</article>
	);
}

async function getCharacters() {
	const url = BASE_URL;
	const res = await fetch(url);
	if (res.status !== 200) {
		return 'We don`t find anything in db for you request';
	}
	const result = await res.json();
	return sortByName(result);
}

async function getCharactersWithParams(page: string, search: string) {
	const url = search ? `${BASE_URL}?page=${page}&name=${search}` : `${BASE_URL}?page=${page}`;
	const res = await fetch(url);
	if (res.status !== 200) {
		return 'We don`t find anything in db for you request';
	}
	const result = await res.json();
	return sortByName(result);
}

export const mainLoader = async () => defer({ newCharacters: getCharacters() });

export const mainLoaderWithSearch: LoaderFunction = async ({ params }) => defer({ newCharacters: getCharactersWithParams(params.page as string, params.search as string) });

export const mainLoaderWithPagination: LoaderFunction = async ({ params }) => defer({ newCharacters: getCharactersWithParams(params.page as string, params.search as string) });
