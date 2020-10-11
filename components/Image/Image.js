import { default as React } from "react";
import styles from "styles/components/Image.module.css";

export default function Image(props) {
	return (
		<div className={styles.image}>
			<img src={props.src} />
		</div>
	);
}
