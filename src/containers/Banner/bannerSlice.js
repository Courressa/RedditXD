import { createSlice } from "@reduxjs/toolkit";

export const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        userSearch: "",
        userSearchClick: false,
        menuDropdown: false,
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
        },
        collectmenuDropdownClick: (state) => {
            state.menuDropdown = !state.menuDropdown;
        }
    }
});

export const selectUserSearch = (state) => state.banner.userSearch;
export const selectUserSearchClick = (state) => state.banner.userSearchClick;
export const selectMenuDropdownClick = (state) => state.banner.menuDropdown;

export const { collectUserSearch, collectUserSearchClick, collectmenuDropdownClick } = bannerSlice.actions;

export default bannerSlice.reducer;