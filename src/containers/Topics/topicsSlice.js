import { createSlice } from "@reduxjs/toolkit";


export const topicsSlice = createSlice({
    name: 'topics',
    initialState: {
        topics: ""
    },
    reducers: {
        collectFetchTopic: (state, action) => {
            state.topics = action.payload.replaceAll(/ /g, "_").replaceAll("&", "and").toLowerCase();
        },
    }
})


export const selectTopics = (state) => state.topics.topics;
export const loadingTopics = (state) => state.topics.isLoading;

export const { collectFetchTopic } = topicsSlice.actions;
export default topicsSlice.reducer;