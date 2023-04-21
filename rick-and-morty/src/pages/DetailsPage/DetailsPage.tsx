/* eslint-disable max-len */
import {
	Await,
	LoaderFunction, defer, useLoaderData, useNavigate,
} from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { InfoItem } from '../../components/InfoItem/InfoItem';
import styles from './DetailsPage.module.scss';
import { DetailsData } from '../../types/types';
import { Preloader } from '../../components/Preloader/Preloader';
import { BASE_URL } from '../../consts/consts';

type UpdateCharactersData = {
	character : DetailsData
}

export function DetailsPage() {
	const { character } = useLoaderData() as UpdateCharactersData;
	const navigate = useNavigate();
	const goBack = () => navigate(-1);
	const [title, setTitle] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
		if (title) document.title = `${title}`;
	}, [title]);

	return (
		<article className={styles.container}>
			<button type="button" onClick={goBack} className={styles.return} tabIndex={-1}>go back</button>
			<Suspense fallback={<Preloader />}>
				<Await resolve={character}>
					{
						(resolvedCharacter) => {
							if (resolvedCharacter) setTitle(resolvedCharacter.name);
							return (
								<>
									<div className={styles.avatar}>
										<img src={resolvedCharacter.image} alt="avatar" />
									</div>
									<h2 className={styles.title}>{resolvedCharacter.name}</h2>
									<div className={styles.info}>
										<h3 className={styles.info__title}>Informations</h3>
										<div className={styles.info__box}>
											<InfoItem keyItem="Gender" value={resolvedCharacter.gender} />
											<InfoItem keyItem="Status" value={resolvedCharacter.status} />
											<InfoItem keyItem="Specie" value={resolvedCharacter.status} />
											<InfoItem keyItem="Origin" value={resolvedCharacter.origin.name} />
											<InfoItem keyItem="Type" value={resolvedCharacter.type !== '' ? resolvedCharacter.type : 'Unknown'} />
										</div>
									</div>
								</>
							);
						}
					}
				</Await>
			</Suspense>
		</article>
	);
}

async function getCharacter(id: string) {
	const res = await fetch(`${BASE_URL}/${id}`);
	const character: Promise<DetailsData> = res.json();
	return character;
}

export const detailsLoader: LoaderFunction = async ({ params }) => defer({ character: getCharacter(params.id as string) });
