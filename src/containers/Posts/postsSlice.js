import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopular, getPostBasedOnTopic } from "../../api/api";

export const loadPopular = createAsyncThunk(
    'posts/loadPopular',
    async () =>  {
        const popularObj = await getPopular();
        //console.log("popobj", popularObj);
        return popularObj
    }
);

export const loadSelectedTopicPost = createAsyncThunk(
    'topics/loadSelectedTopicPost',
    async (topic) => {
        const topicsObj = await getPostBasedOnTopic(topic);
        //console.log("state topics", topicsObj);
        return topicsObj;
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
            }).addCase(loadSelectedTopicPost.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            }).addCase(loadSelectedTopicPost.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            }).addCase(loadSelectedTopicPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.posts = action.payload;
            })
    }
}

export const postsSlice = createSlice(sliceOption);

export const selectPopular = (state) => state.posts.posts;
export const loadingPopular = (state) => state.posts.isLoading;
export const errorFound = (state) => state.posts.hasError;

export default postsSlice.reducer;