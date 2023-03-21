import { pageDefinition } from '../../function/pageDefinition';
import styles from './Pagination.module.scss';

type PaginationType = {
	next: string | null;
	pages: number;
	prev: string | null;
	cb: (arg0: string) => Promise<void>
}

export function Pagination(props: PaginationType) {
	const {
		next, pages, prev, cb,
	} = props;

	const curPage = pageDefinition({
		linkToNext: next, linkToPrev: prev,
	});

	return (
		<div className={styles.pagination}>
			<button
				type="button"
				className={!prev ? `${styles.button} ` : `${styles.prev}`}
				onClick={() => cb(prev as string)}
				disabled={!prev}
			>
				Prev
			</button>
			<span className={styles.active_page}>{`${curPage} of ${pages}`}</span>
			<button
				type="button"
				className={!next ? `${styles.button} ` : ` ${styles.next}`}
				onClick={() => cb(next as string)}
				disabled={!next}
			>
				Next
			</button>
		</div>
	);
}
