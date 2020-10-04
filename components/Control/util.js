import { useRef } from "react";
import { useDispatch } from "react-redux";
import { selectFile, uploadImg } from "redux/imgLoader/reducer";
import styles from "styles/components/Control.module.css";

export function getControl({
	controlType: type,
	placeholder: placeholderTxt,
}) {
	const dispatch = useDispatch();

	async function dispatchFileUpload(e) {
		let file = null;

		switch (e.type) {
			case "drop":
				file = e.dataTransfer.files[0];
				break;
			case "change":
				file = e.target.files[0];
				break;
			default:
				file = e.target.files[0];
				break;
		}

		try {
			const data = await dispatch(uploadImg(file));

			dispatch(selectFile(file));

			console.log(data);
		} catch (error) {
			console.log("[Error]: ", error);
		}
	}

	function fileInputChangeHandler(e) {
		dispatchFileUpload(e);
	}

	function dropHandler(e) {
		e.preventDefault();

		dispatchFileUpload(e);
	}

	function dropareaClickHandler(e) {
		e.preventDefault();

		document.querySelector("#fileinput").click(e);
	}

	let control = null;

	switch (type) {
		case "droparea":
			const placeholder = (
				<div className={styles["control_dropArea_placeholder"]}>
					{placeholderTxt}
				</div>
			);

			control = (
				<div
					className={styles["control_dropArea"]}
					onDrop={dropHandler}
					onDragOver={dragoverHandler}
					onClick={dropareaClickHandler}
				>
					{placeholder}
				</div>
			);
			break;

		case "file":
			control = (
				<>
					<label
						htmlFor="fileinput"
						className={styles["control_file"]}
					>
						Choose a file
					</label>
					<input
						id="fileinput"
						className={styles["control_file--hidden"]}
						type="file"
						onChange={fileInputChangeHandler}
					/>
				</>
			);
			break;
		default:
			control = <input type="text" />;
	}

	return control;
}

function dragoverHandler(e) {
	e.preventDefault();
}
