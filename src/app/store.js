import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../containers/Posts/postsSlice';
import topicsReducer from '../containers/Topics/topicsSlice';
import bannerSliceReducer from '../containers/Banner/bannerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    topics: topicsReducer,
    banner: bannerSliceReducer,
  },
});
