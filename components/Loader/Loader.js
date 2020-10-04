import { default as React } from "react";
import styles from "styles/components/Loader.module.css";

export default function Loader() {
	return (
		<div className={styles.loader}>
			<div className={styles["loader_indicator"]}></div>
		</div>
	);
}
