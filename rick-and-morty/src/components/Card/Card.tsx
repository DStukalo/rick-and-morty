import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

type CardData = {
	img: string;
	title: string;
	text: string;
	id: number;
}

export function Card(props: CardData) {
	const {
		img, title, text, id,
	} = props;
	return (
		<section>
			<Link to={`/details/${id}`}>
				<div className={styles.card}>
					<div className={styles.image}>
						<img src={img} alt="" />
					</div>
					<div className={styles.description}>
						<p className={styles.description__title}>{title}</p>
						<p className={styles.description__text}>{text}</p>
					</div>
				</div>
			</Link>
		</section>
	);
}
