import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
	const [second, setSecond] = useState(5);
	const navigate = useNavigate();

	function tic(): void {
		if (second > 0) setSecond(second - 1);
	}

	function updateTime() {
		const timeId = setInterval(tic, 1000);
		function redirectToMain() {
			clearInterval(timeId);
			navigate('/');
		}
		setTimeout(redirectToMain, 5000);
	}
	updateTime();

	return (
		<div className={styles.wrapper}>
			<section className={styles.section}>
				<div className={styles.text}>
					This page Not Found.
				</div>
				<div className={styles.text}>
					You will be redirected to the home page via
					{' '}
					<span className={styles.time}>{second}</span>
				</div>
			</section>
		</div>
	);
}
