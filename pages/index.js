import Head from "next/head";
import { useSelector } from "react-redux";
import Layout from "common/Layout/Layout";
import Form from "components/Form/Form";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";
import Image from "components/Image/Image";
import Control from "components/Control/Control";

export default function Home() {
	const { imgLoader } = useSelector((state) => state);

	return (
		<Layout centered>
			<Head>
				<title>Image Uploader App.</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Poppins:wght@400;500&display=swap"
					rel="stylesheet"
				></link>
			</Head>

			<main>
				{!imgLoader.loading &&
				imgLoader.file &&
				imgLoader.uploaded ? (
					<p>
						<a
							href=""
							style={{
								textDecoration: "underline",
								color: "#2f80ed",
							}}
						>
							Back
						</a>
					</p>
				) : null}

				{imgLoader.error ? (
					<p
						style={{ textAlign: "center", color: "rgb(247, 84, 46)" }}
					>
						{"Error: "} {imgLoader.error.message}
					</p>
				) : null}
				{!imgLoader.loading &&
				!imgLoader.file &&
				!imgLoader.uploaded ? (
					<Form formTitle={"Upload your image"} />
				) : null}
				{imgLoader.loading &&
				!imgLoader.file &&
				!imgLoader.uploaded ? (
					<Modal title="Uploading...">
						<Loader />
					</Modal>
				) : null}
				{!imgLoader.loading &&
				imgLoader.file &&
				imgLoader.uploaded ? (
					<Modal title="Uploaded successfully!" centeredTitle>
						<Image src={imgLoader.file.filepath} />
						<Control controlType="clipboard" />
					</Modal>
				) : null}
			</main>
		</Layout>
	);
}
