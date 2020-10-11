import Button from "components/Button/Button";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImg } from "redux/imgLoader/reducer";
import styles from "styles/components/Control.module.css";

export function getControl({
	controlType: type,
	placeholder: placeholderTxt,
}) {
	const { file } = useSelector((state) => state.imgLoader);
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

			console.log(data);
		} catch (error) {
			console.log("[Upload error]: ", error);
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
					className={[
						styles["control"],
						styles["control_dropArea"],
					].join(" ")}
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
						className={[styles["control_file"], "button"].join(" ")}
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
		case "clipboard":
			control = (
				<div
					className={[
						styles["control"],
						styles["control_clipboard"],
					].join(" ")}
				>
					<input
						id="clipboard_content"
						className={styles["control_clipboard_content"]}
						type="text"
						value={`http://localhost:3030${file.filepath}`}
						disabled
						readOnly
					/>
					<div>
						<Button txt="Copy Link" clicked={saveToClipboard} />
					</div>
				</div>
			);
			break;
		default:
			control = <input type="text" />;
	}

	return control;
}

function saveToClipboard() {
	const content = document.querySelector("#clipboard_content");

	content.select();
	content.setSelectionRange(0, 99999);

	document.execCommand("copy");
}

function dragoverHandler(e) {
	e.preventDefault();
}
