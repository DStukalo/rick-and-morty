/* eslint-disable max-len */
import {
	Await,
	LoaderFunction, defer, useLoaderData, useNavigate,
} from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { InfoItem } from '../../components/InfoItem/InfoItem';
import styles from './DetailsPage.module.scss';
import { DetailsData } from '../../types/types';
import { Preloader } from '../../components/Preloader/Preloader';

type UpdateCharactersData = {
	character : DetailsData
}

export function DetailsPage() {
	const { character } = useLoaderData() as UpdateCharactersData;
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = `${character.name}`;
	}, [character]);

	return (
		<div className={styles.container}>
			<button type="button" onClick={goBack} className={styles.return} tabIndex={-1}>go back</button>
			<Suspense fallback={<Preloader />}>
				<Await resolve={character}>
					{
						(resolvedCharacter) => (
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
						)
					}
				</Await>
			</Suspense>
		</div>
	);
}

async function getCharacter(id: string) {
	const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
	const character: Promise<DetailsData> = res.json();
	return character;
}

export const detailsLoader: LoaderFunction = async ({ params }) => defer({ character: getCharacter(params.id as string) });
