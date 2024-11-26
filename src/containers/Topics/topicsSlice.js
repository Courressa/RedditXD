import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTopics } from "../../api/api";

export const loadTopics = createAsyncThunk(
    'topics/loadTopics',
    async () => {
        const topicsObj = await getTopics();
        console.log("state topics", topicsObj);
        return topicsObj;
    }
);

export const topicsSlice = createSlice({
    name: 'topics',
    initialState: {
        sendTopics: "",
        listTopics: []
    },
    reducers: {
        collectFetchTopic: (state, action) => {
            state.sendTopics = action.payload;
        },
    }, 
    extraReducers: (builder) => {
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
                state.listTopics = action.payload.sort((a, b) => {
                    return a.data.display_name.localeCompare(b.data.display_name);
                });;
            })
    }
})


export const selectTopics = (state) => state.topics.sendTopics;
export const loadingTopics = (state) => state.topics.isLoading;

export const selectListTopics = (state) => state.topics.listTopics;

export const { collectFetchTopic } = topicsSlice.actions;
export default topicsSlice.reducer;