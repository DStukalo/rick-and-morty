import { useEffect } from 'react';
import styles from './Registration.module.scss';
import { FormAuthOrReg } from '../FormAuthOrReg/FormAuthOrReg';

export function Registration() {
	useEffect(() => {
		document.title = 'Registration | Rick&Morty';
	}, []);

	return (
		<section className={styles.reg}>
			<h2>Registration</h2>
			<FormAuthOrReg typeForm="Reg" />
		</section>
	);
}
