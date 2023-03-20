import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { Providers, auth } from '../../config/firebase';
import { SignInWithSocialMedia } from '../../modules/auth';
import styles from './Layout.module.scss';

export function Layout() {
	const [authenticating, setAuthenticating] = useState<boolean>(false);
	const [showAuth, setShowAuth] = useState<boolean>(true);

	const [error, setError] = useState<string>('');

	function signInWithSocialMedia(provider: firebase.auth.AuthProvider) {
		if (error !== '') setError('');
		if (authenticating) return;

		setAuthenticating(true);
		setShowAuth(false);

		SignInWithSocialMedia(provider)
			.then(() => {
				setShowAuth(true);
			})
			.catch((err) => {
				setAuthenticating(false);
				setError(err.message);
			});
	}
	const nameLinkToAuth = (auth.currentUser && authenticating) ? `Hello ${auth.currentUser.displayName}` : 'Authentication';
	return (
		<>
			<header className={styles.header}>
				{
					showAuth ? (
						<button
							type="button"
							onClick={() => signInWithSocialMedia(Providers.google)}
							className={`${styles.btn} ${(authenticating ? styles.authenticating : styles.btn_auth)}`}
						>
							<p className={styles.text}>
								{nameLinkToAuth}
							</p>
						</button>
					) : null
				}
			</header>
			<Outlet />
		</>
	);
}
