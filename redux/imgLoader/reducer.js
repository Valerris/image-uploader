const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import initialState from "./initialState";

const SLICE_NAME = "imgLoader";

export const uploadImg = createAsyncThunk(
	`${SLICE_NAME}/uploadImg`,
	async (file, thunkAPI) => {
		const fd = new FormData();

		fd.append("file", file, file.name);

		const response = await fetch("/api/upload/file", {
			method: "POST",
			body: fd,
		});

		if (response.status < 200 || response.status > 299) {
			return Promise.reject(response.statusText);
		}

		return response.json();
	}
);

const slice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = !state.loading;
		},
		selectFile: (state, action) => {
			state.fileSelected = action.payload;
		},
	},
	extraReducers: {
		[uploadImg.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[uploadImg.fulfilled]: (state, action) => {
			state.loading = false;
			state.uploaded = true;
			state.file = action.payload;
			state.error = null;
		},
		[uploadImg.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	},
});

export const { setLoading, selectFile } = slice.actions;

export default slice.reducer;
