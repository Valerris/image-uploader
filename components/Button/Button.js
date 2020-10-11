export { default as React } from "react";

export default function Button({ txt = "Click", clicked }) {
	return (
		<button className={"button"} onClick={clicked}>
			{txt}
		</button>
	);
}
