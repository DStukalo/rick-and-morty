import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import firebase from 'firebase/compat/app';
import {
	createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile,
} from 'firebase/auth';
import { useAuth } from '../../store/store';
import { Providers, auth } from '../../config/firebase';
import { SignInWithSocialMedia } from '../../modules/auth';
import styles from './FormAuthOrReg.module.scss';
import { useInput } from '../../function/useInput';
import { Preloader } from '../Preloader/Preloader';
import { Modal } from '../Modal/Modal';

type FormProps = {
	typeForm: 'Auth' | 'Reg'
}

type Err = {
	code: string,
	message: string
}

export function FormAuthOrReg(props: FormProps) {
	const name = useInput('', { isEmpty: true, minLength: 3 });
	const mail = useInput('', { isEmpty: true, isEmail: true });
	const pass = useInput('', { isEmpty: true, minLength: 8 });
	const [passToConfirm, setPassToConfirm] = useState('');
	const passwordConfirm = useInput('', { isEmpty: true, minLength: 8, isPasswordMatch: true }, passToConfirm);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [succesMessage, setSuccesMessage] = useState<string>('');
	const [openErrorModal, setOpenErrorModal] = useState(false);
	const [openSuccessModal, setOpenSuccessModal] = useState(false);

	const navigate = useNavigate();

	const { typeForm } = props;

	const {
		isAuth,
		updateAuthStatusToTrue,
		setUserName,
	} = useAuth((state) => ({
		isAuth: state.isAuth,
		updateAuthStatusToTrue: state.updateAuthStatusToTrue,
		setUserName: state.setUserName,
	}), shallow);

	async function signInWithSocialMedia(provider: firebase.auth.AuthProvider) {
		if (errorMessage !== '') setErrorMessage('');
		if (isAuth) return;

		setIsLoading(true);
		try {
			const res = await SignInWithSocialMedia(provider);
			if (res.user?.displayName) setUserName(res.user?.displayName);
			setOpenSuccessModal(true);
			setIsLoading(false);
			setSuccesMessage('You have successfully logged');
		} catch (error) {
			setOpenErrorModal(true);
			setErrorMessage('We have some problem. Please try again for late');
			setIsLoading(false);
		}
	}

	async function handleSubmitAuth(e: React.FormEvent<HTMLFormElement>) {
		if (errorMessage !== '') setErrorMessage('');
		if (isAuth) return;
		e.preventDefault();
		setIsLoading(true);
		if (mail.inputValid && pass.inputValid) {
			try {
				const response = await signInWithEmailAndPassword(auth, mail.value, pass.value);
				if (response.user) setUserName(response.user.displayName);
				setOpenSuccessModal(true);
				if (response.user?.displayName) setUserName(response.user?.displayName);
				setSuccesMessage('You have successfully logged');
			} catch (err) {
				if ((err as Err).code === 'auth/user-not-found') setErrorMessage('There is no user record corresponding to this identifier. The user may have been deleted.');
				if ((err as Err).code === 'auth/wrong-password') setErrorMessage('The password is invalid or the user does not have a password');
				setIsLoading(false);
				setOpenErrorModal(true);
			}
		}
	}

	async function handleSubmitReg(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		if (name.inputValid && mail.inputValid && pass.inputValid) {
			try {
				await createUserWithEmailAndPassword(auth, mail.value, pass.value);
				const logNewUser = await signInWithEmailAndPassword(auth, mail.value, pass.value);
				if (!logNewUser.user.displayName) {
					await updateProfile(logNewUser.user, {
						displayName: name.value,
					});
				}
				setIsLoading(false);
				if (logNewUser.user?.displayName) setUserName(logNewUser.user?.displayName);
				setOpenSuccessModal(true);
				setSuccesMessage('You have successfully register and logged');
			} catch (err) {
				if ((err as Err).code === 'auth/email-already-in-use') setErrorMessage('The email address is already in use by another account');
				if ((err as Err).code === 'auth/invalid-email') setErrorMessage('The email address is badly formatted');
				setIsLoading(false);
				setOpenErrorModal(true);
			}
		}
	}

	return (
		<section>
			{isLoading ? <Preloader /> : null}
			<form
				onSubmit={typeForm === 'Auth' ? handleSubmitAuth : handleSubmitReg}
				className={styles.form}
			>
				{openErrorModal && (
					<Modal
						title="Error"
						buttonText="Close"
						onClose={() => setOpenErrorModal(false)}
						classes="modal_auth"
					>
						<p>{errorMessage}</p>
					</Modal>
				)}
				{openSuccessModal && (
					<Modal
						title="Success"
						buttonText="To main"
						onClose={() => {
							setOpenSuccessModal(false);
							updateAuthStatusToTrue();
							navigate('/');
						}}
						classes="modal_auth"
					>
						<p>{succesMessage}</p>
					</Modal>
				)}
				{typeForm === 'Reg' ? (
					<label htmlFor="name" className={styles.form__fieldset}>
						<input
							type="text"
							name="name"
							value={name.value}
							onChange={(e) => name.onChange(e)}
							onBlur={() => name.onBlur()}
							id="name"
							className={styles.form__input}
							placeholder="name"
						/>
						{(name.isDirty && name.isEmpty) && (
							<p className={styles.error}>Enter the name, the field can not be empty</p>
						)}
						{(name.isDirty && name.minLengthError && !name.isEmpty) && (
							<p className={styles.error}>Name must contain at least 3 letters</p>
						)}
					</label>
				) : null }
				<label htmlFor="email" className={styles.form__fieldset}>
					<input
						type="text"
						name="email"
						value={mail.value}
						onChange={(e) => mail.onChange(e)}
						onBlur={() => mail.onBlur()}
						id="email"
						className={styles.form__input}
						placeholder="email"
					/>
					{(mail.isDirty && mail.isEmpty) && (
						<p className={styles.error}>Enter the email, the field can not be empty</p>
					)}
					{(mail.isDirty && mail.emailError && !mail.isEmpty) && (
						<p className={styles.error}>Incorrect mail, check your data</p>
					)}
				</label>
				<label htmlFor="password" className={styles.form__fieldset}>
					<input
						type="password"
						name="password"
						value={pass.value}
						onChange={(e) => pass.onChange(e)}
						onBlur={() => pass.onBlur()}
						id="password"
						className={styles.form__input}
						placeholder="password"
					/>
					{(pass.isDirty && pass.isEmpty) && (
						<p className={styles.error}>Password must contain at least 6 numbers</p>
					)}
					{(pass.isDirty && pass.minLengthError && !pass.isEmpty) && (
						<p className={styles.error}>Password must contain at least 6 numbers</p>
					)}
				</label>
				<button
					type="submit"
					className={styles.form__button}
					disabled={typeForm === 'Auth' ? (!mail.inputValid || !pass.inputValid)
						: (!mail.inputValid || !pass.inputValid || !name.inputValid)}
				>
					{typeForm === 'Auth' ? 'Log in' : 'Register'}
				</button>
				{typeForm === 'Auth' ? (
					<>
						<p className={styles.form__link}>
							Don&apos;t have an account?
							{' '}
							<Link to="/authorization/registration">Register</Link>
							{' '}
							now.
						</p>
						<button
							type="button"
							onClick={() => signInWithSocialMedia(Providers.google)}
							className={styles.form__auth}
						>
							<p className={styles.google}>
								Login with Google
							</p>
						</button>
					</>
				) : (
					<p className={styles.form__link}>
						Already have an account?
						{' '}
						<Link to="/authorization/login">Login</Link>
						{' '}
						now.
					</p>
				)}
			</form>
		</section>
	);
}
