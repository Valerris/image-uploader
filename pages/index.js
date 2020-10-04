import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Layout from "common/Layout/Layout";
import Form from "components/Form/Form";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";
import { setLoading } from "redux/imgLoader/reducer";

export default function Home() {
	const dispatch = useDispatch();
	const { imgLoader } = useSelector((state) => state);

	const clickHandler = (e) => {
		dispatch(setLoading());
	};

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
				{!imgLoader.loading ? (
					<Form formTitle={"Upload your image"} />
				) : (
					<Modal title="Uploading...">
						<Loader />
					</Modal>
				)}
			</main>
		</Layout>
	);
}
