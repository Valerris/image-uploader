import { default as React } from "react";
import styles from "styles/components/Modal.module.css";

export default function Modal({ children, title, centeredTitle }) {
	const titleStyles = centeredTitle ? { textAlign: "center" } : null;

	const modalTitle = title && (
		<h4 className={styles["modal_title"]} style={titleStyles}>
			{title}
		</h4>
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
