import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTopics } from "../../api/api";

export const loadTopics = createAsyncThunk(
    'topics/loadingTopics',
    async () => {
        const topicsObj = await getTopics();
        console.log("state topics", topicsObj);
        return topicsObj;
    }
);

export const topicsSlice = createSlice({
    name: 'topics',
    initialState: {
        topics: [],
        isLoading: false,
        hasError: false
    },
    extraReducer: (builder) => {
        builder
            .addCase(loadTopics.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            }).addCase(loadTopics.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            }).addCase(loadTopics.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.topics = action.payload;
            })
    }
})


export const selectTopics = (state) => state.topics.topics;
export const loadingTopics = (state) => state.topics.isLoading;

export default topicsSlice.reducer;