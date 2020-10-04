import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import initialState from "./initialState";
import middleware from "./middleware";

const devTools = process.env.NODE_ENV === "development";

const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
	middleware,
	devTools,
});

export default store;
