import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import store from "redux/createStore";
import "styles/globals.css";

const makeStore = () => store;

const wrapper = createWrapper(makeStore, { debug: false });

function MyApp(props) {
	const { Component, pageProps } = props;

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default wrapper.withRedux(MyApp);
