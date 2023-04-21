import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { browserSessionPersistence, signOut } from 'firebase/auth';
import { Providers, auth } from '../../config/firebase';
import { SignInWithSocialMedia } from '../../modules/auth';
import styles from './Layout.module.scss';
import { ScrollBtn } from '../ScrollBtn/ScrollBtn';
import { Header } from '../Header/Header';

export function Layout() {
	const [authenticating, setAuthenticating] = useState<boolean>(false);
	const [showAuth, setShowAuth] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const nameLinkToAuth = (auth.currentUser && authenticating) ? `Hello ${auth.currentUser.displayName}` : 'Authentication';

	function logOut() {
		signOut(auth);
		setAuthenticating(false);
	}

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

	return (
		<>
			<Header />
			<Outlet />
			<ScrollBtn />
		</>
	);
}
