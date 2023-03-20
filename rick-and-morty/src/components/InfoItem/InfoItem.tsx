import styles from './InfoItem.module.scss';

type ItemProps = {
	keyItem: string;
	value: string
}

export function InfoItem(props: ItemProps) {
	const { keyItem, value } = props;
	return (
		<div className={styles.info__item}>
			<p className={styles.info__item_header}>
				{keyItem}
			</p>
			<p className={styles.info__item_text}>
				{value}
			</p>
		</div>
	);
}
