import { default as React } from "react";
import styles from "styles/components/Modal.module.css";

export default function Modal({ children, title }) {
	const modalTitle = title && (
		<h4 className={styles["modal_title"]}>{title}</h4>
	);

	const modalBody = children && (
		<div className={styles["modal_body"]}>{children}</div>
	);

	return (
		<div className={styles.modal}>
			{modalTitle}
			{modalBody}
		</div>
	);
}
