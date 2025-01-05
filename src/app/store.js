import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../containers/Posts/postsSlice';
import topicsReducer from '../containers/Topics/topicsSlice';
import bannerSliceReducer from '../containers/Banner/bannerSlice';
import modeSetterSliceReducer from '../features/ModeSetter/modeSetterSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    topics: topicsReducer,
    banner: bannerSliceReducer,
    modeSetter: modeSetterSliceReducer,
  },
});
