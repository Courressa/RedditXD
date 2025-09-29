import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTopics } from "../../api/api";

export const loadTopics = createAsyncThunk(
    'topics/loadTopics',
    async () => {
        const topicsObj = await getTopics();
        return topicsObj;
    }
);

export const topicsSlice = createSlice({
    name: 'topics',
    initialState: {
        sendTopics: "",
        mainTopicClick: false,
        listTopics: []
    },
    reducers: {
        collectFetchTopic: (state, action) => {
            state.sendTopics = action.payload;
        },
        collectMainTopicClick: (state) => {
            if (state.mainTopicClick === false) {
                state.mainTopicClick = true;
            } else if (state.mainTopicClick === true) {
                state.mainTopicClick = false;
            }
            
        },
        resetSelectedTopic: (state) => {
            state.sendTopics = "";
        }
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
                if (action.payload) {
                    state.listTopics = action.payload.sort((a, b) => {
                        return a.data.display_name.localeCompare(b.data.display_name);
                    });
                }
                
            })
    }
})


export const selectTopics = (state) => state.topics.sendTopics;
export const loadingTopics = (state) => state.topics.isLoading;
export const selectMainTopicsClick = (state) => state.topics.mainTopicClick;

export const selectListTopics = (state) => state.topics.listTopics;

export const { collectFetchTopic, collectMainTopicClick, resetSelectedTopic } = topicsSlice.actions;
export default topicsSlice.reducer;