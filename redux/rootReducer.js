import { combineReducers } from "@reduxjs/toolkit";
import imgLoaderReducer from "./imgLoader/reducer";

export default combineReducers({
	imgLoader: imgLoaderReducer,
});
