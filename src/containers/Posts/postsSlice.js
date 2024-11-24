import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopular } from "../../api/api";

export const loadPopular = createAsyncThunk(
    'posts/loadPopular',
    async () =>  {
        const popularObj = await getPopular();
        console.log("popobj", popularObj);
        return popularObj
    }
);

const sliceOption = {
    name:'posts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPopular.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            }).addCase(loadPopular.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            }).addCase(loadPopular.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.posts = action.payload;
            })
    }
}

export const postsSlice = createSlice(sliceOption);

export const selectPopular = (state) => state.posts.posts;
export const loadingPopular = (state) => state.posts.isLoading;

export default postsSlice.reducer;