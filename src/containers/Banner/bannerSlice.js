import { createSlice } from "@reduxjs/toolkit";

export const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        userSearch: "",
        darkMode: false,
    },
    reducers: {
        collectUserSearch: (state, action) => {
            state.userSearch = action.payload;
        }
    }
});

export const selectUserSearch = (state) => state.banner.userSearch;

export const { collectUserSearch } = bannerSlice.actions;

export default bannerSlice.reducer;