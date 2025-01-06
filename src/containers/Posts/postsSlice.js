import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopular, getPostBasedOnTopic, getSearch, getCommentListForPost } from "../../api/api";

export const loadPopular = createAsyncThunk(
    'posts/loadPopular',
    async () =>  {
        const popularObj = await getPopular();
        console.log("popobj", popularObj);
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

export const loadUserSearch = createAsyncThunk(
    'topics/loadUserSearch',
    async (userSearch) => {
        const searchObj = await getSearch(userSearch);
        //console.log("user search", searchObj);
        return searchObj;
    }
);

export const loadComments = createAsyncThunk(
   'topics/loadComments',
    async ({subreddit, postId}) => {
        const commentsObj = await getCommentListForPost(subreddit, postId);
        //console.log("post comments", commentsObj);
        return commentsObj;
    } 
)

const sliceOption = {
    name:'posts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        comments: {},
        commentsIsLoading: false,
        commentsHasError: false,
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
            
            .addCase(loadSelectedTopicPost.pending, (state) => {
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
            
            .addCase(loadUserSearch.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            }).addCase(loadUserSearch.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            }).addCase(loadUserSearch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.posts = action.payload;
            })
            
            .addCase(loadComments.pending, (state) => {
                state.commentsIsLoading = true;
                state.commentsHasError = false;
            }).addCase(loadComments.rejected, (state) => {
                state.commentsIsLoading = false;
                state.commentsHasError = true;
            }).addCase(loadComments.fulfilled, (state, action) => {
                try {
                    state.commentsIsLoading = false;
                    state.commentsHasError = false;
                    const { postId, comments } = action.payload;
                    state.comments[postId] = comments;
                } catch (error) {
                    console.log(error);
                };
            })
    }
}

export const postsSlice = createSlice(sliceOption);

export const selectPost = (state) => state.posts.posts;
export const loadingPopular = (state) => state.posts.isLoading;
export const errorFound = (state) => state.posts.hasError;

export const selectComments = (state, postId) => state.posts.comments[postId];
export const loadingComments = (state) => state.posts.commentsIsLoading;
export const errorFoundInComments = (state) => state.posts.commentsHasError;

export default postsSlice.reducer;