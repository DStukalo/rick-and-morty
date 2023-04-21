import { useEffect } from 'react';
import { FormAuthOrReg } from '../FormAuthOrReg/FormAuthOrReg';
import styles from './Login.module.scss';

export function Login() {
	useEffect(() => {
		document.title = 'Login | Rick&Morty';
	}, []);

	return (
		<section className={styles.auth}>
			<h2>Login</h2>
			<FormAuthOrReg typeForm="Auth" />
		</section>
	);
}
