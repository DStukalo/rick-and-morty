import { create } from 'zustand';

type AuthState = {
	isAuth: boolean,
	userName: string | null,
	updateAuthStatusToTrue: () => void,
	updateAuthStatusToFalse: () => void,
	setUserName: (newName: string | null) => void
}

export const useAuth = create<AuthState>((set) => ({
	isAuth: false,
	userName: null,
	updateAuthStatusToTrue: () => {
		set({ isAuth: true });
	},
	updateAuthStatusToFalse: () => {
		set({ isAuth: false });
	},
	setUserName: (newName) => {
		set({ userName: newName });
	},
}));
