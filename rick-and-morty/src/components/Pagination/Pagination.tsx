import { useNavigate, useParams } from 'react-router-dom';
import { pageDefinition } from '../../function/pageDefinition';
import styles from './Pagination.module.scss';

type PaginationType = {
	next: string | null;
	pages: number;
	prev: string | null;
}

export function Pagination(props: PaginationType) {
	const { search, page } = useParams();
	const navigate = useNavigate();
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
						navigate(search ? `/${Number(page) - 1}/${search}` : `/${Number(page) - 1}`);
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
						navigate(search ? `/${Number(page) + 1}/${search}` : `/${Number(page) + 1}`);
					}
				}}
				disabled={!next}
			>
				Next
			</button>
		</div>
	);
}
