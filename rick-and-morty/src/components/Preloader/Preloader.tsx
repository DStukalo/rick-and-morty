import styles from './Preloader.module.scss';

export function Preloader() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.loader} />
		</div>
	);
}
