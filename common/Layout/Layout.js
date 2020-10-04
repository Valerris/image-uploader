import { default as React } from "react";
import styles from "styles/common/Layout.module.css";

export default function Layout({ children, centered = false }) {
	const classes = [styles.layout];

	centered ? classes.push(styles["layout--centered"]) : null;

	return <div className={classes.join(" ")}>{children}</div>;
}
