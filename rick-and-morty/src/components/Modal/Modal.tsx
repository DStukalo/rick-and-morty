import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
	title?: string;
	classes: string;
	buttonText?: string;
	onClose?: () => void;
	children?: ReactNode;
}

export function Modal(props: ModalProps) {
	const {
		title, classes, onClose, children, buttonText,
	} = props;

	return (
		ReactDOM.createPortal(
			<section className={styles.container}>
				<div className={styles.modal}>
					<div className={styles[classes]}>
						<div>
							<h2>{title}</h2>
							{children}
							<button type="button" onClick={onClose}>{buttonText || 'close'}</button>
						</div>
					</div>
				</div>
			</section>,
		document.getElementById('modal-root') as HTMLElement,
		)
	);
}
