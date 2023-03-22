import { pageDefinition } from '../../function/pageDefinition';
import { useCharacters } from '../../store/store';
import styles from './Pagination.module.scss';

type PaginationType = {
	next: string | null;
	pages: number;
	prev: string | null;
}

export function Pagination(props: PaginationType) {
	const { fetchCharacters, updateCurPage } = useCharacters((state) => ({
		fetchCharacters: state.fetchCharacters,
		updateCurPage: state.updateCurPage,
	}));
	const {
		next, pages, prev,
	} = props;

	const curPage = pageDefinition({
		linkToNext: next, linkToPrev: prev,
	});

	return (
		<div className={styles.pagination}>
			<button
				type="button"
				className={!prev ? `${styles.button} ` : `${styles.prev}`}
				onClick={() => {
					if (prev) {
						updateCurPage(prev as string);
						fetchCharacters(prev as string);
					}
				}}
				disabled={!prev}
			>
				Prev
			</button>
			<span className={styles.active_page}>{`${curPage} of ${pages}`}</span>
			<button
				type="button"
				className={!next ? `${styles.button} ` : ` ${styles.next}`}
				onClick={() => {
					if (next) {
						updateCurPage(next);
						fetchCharacters(next);
					}
				}}
				disabled={!next}
			>
				Next
			</button>
		</div>
	);
}
