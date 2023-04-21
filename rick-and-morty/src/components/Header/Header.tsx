import { useEffect } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { shallow } from 'zustand/shallow';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Firebase, { auth } from '../../config/firebase';
import { useAuth } from '../../store/store';
import styles from './Header.module.scss';

export function Header() {
	const {
		isAuth, updateAuthStatusToFalse,
		updateAuthStatusToTrue,
		userName, setUserName,
	} = useAuth((state) => ({
		isAuth: state.isAuth,
		updateAuthStatusToFalse: state.updateAuthStatusToFalse,
		updateAuthStatusToTrue: state.updateAuthStatusToTrue,
		userName: state.userName,
		setUserName: state.setUserName,
	}), shallow);
	const reAuth = getAuth(Firebase);
	const [user, error] = useAuthState(reAuth);

	useEffect(() => {
		if (!error && user) {
			updateAuthStatusToTrue();
			setUserName(user.displayName);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, error]);

	function logOut() {
		signOut(auth);
		updateAuthStatusToFalse();
		setUserName(null);
	}

	return (
		<header className={styles.header}>
			<nav className={styles.navigation}>
				<ul className={styles.navigation_list}>
					{!isAuth ? (
						<>
							<li className={styles.navigation_item}>
								<NavLink
									to="/"
									className={styles.navigation__item_link}
								>
									Main
								</NavLink>
							</li>
							<li className={styles.navigation_item}>
								<NavLink
									to="authorization/login"
									className={styles.navigation__item_link}
								>
									Login
								</NavLink>
							</li>
						</>
					) : (
						<li className={styles.navigation_item}>
							<NavLink
								to="/"
								className={styles.navigation__item_link}
							>
								Main
							</NavLink>
						</li>
					)}
				</ul>
				{isAuth && userName !== null ? (
					<div className={styles.authenticating}>
						<button
							type="button"
							onClick={() => logOut()}
							className={styles.logout}
						>
							log out
						</button>
						<p className={styles.user}>
							{userName}
						</p>
					</div>
				) : null}
			</nav>
		</header>
	);
}
