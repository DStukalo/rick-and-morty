import { useState } from 'react';
import styles from './ScrollBtn.module.scss';

export function ScrollBtn() {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 350) {
			setVisible(true);
		} else if (scrolled <= 350) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	window.addEventListener('scroll', toggleVisible);

	return (
		<button
			type="button"
			onClick={scrollToTop}
			className={visible ? `${styles.button} ${styles.visible}` : ` ${styles.hidden} ${styles.button}`}
		>
			<span>
				&#10514;
			</span>
		</button>
	);
}
