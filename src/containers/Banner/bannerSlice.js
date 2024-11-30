import { createSlice } from "@reduxjs/toolkit";

export const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        userSearch: "",
        userSearchClick: false,
        darkMode: false,
        
    },
    reducers: {
        collectUserSearch: (state, action) => {
            state.userSearch = action.payload;
        },
        collectUserSearchClick: (state) => {
            if (state.userSearchClick === false) {
                state.userSearchClick = true;
            } else if (state.userSearchClick === true) {
                state.userSearchClick = false;
            }
        }
    }
});

export const selectUserSearch = (state) => state.banner.userSearch;
export const selectUserSearchClick = (state) => state.banner.userSearchClick;

export const { collectUserSearch, collectUserSearchClick } = bannerSlice.actions;

export default bannerSlice.reducer;