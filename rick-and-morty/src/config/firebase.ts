import firebase from 'firebase/compat/app';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';
import 'firebase/compat/auth';
import { config } from './config';

const Firebase = firebase.initializeApp(config.firebase);

export const Providers = {
	google: new firebase.auth.GoogleAuthProvider(),
};

export const auth = firebase.auth();

(async () => {
	await setPersistence(auth, browserLocalPersistence);
})();

export default Firebase;
