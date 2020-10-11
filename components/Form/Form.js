import { default as React } from "react";
import Control from "components/Control/Control";
import styles from "styles/components/Form.module.css";

export default function Form(props) {
	const { formTitle } = props;

	const title = formTitle ? (
		<div>
			<h4 className={styles["form_title"]}>{formTitle}</h4>
		</div>
	) : null;

	return (
		<form className={styles.form}>
			{title}
			<div className={styles["form_subtitle"]}>
				File should be JPEG, PNG...
			</div>
			<div className={styles["form_group"]}>
				<Control
					controlType="droparea"
					placeholder="Drag & Drop your image here"
				/>
			</div>
			<div className={styles["form_group"]}>
				<div
					className={[
						styles["form_subtitle"],
						styles["light-grey"],
					].join(" ")}
				>
					Or
				</div>
			</div>
			<div className={styles["form_group"]}>
				<Control controlType="file" />
			</div>
		</form>
	);
}
