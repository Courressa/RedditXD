import { createSlice } from "@reduxjs/toolkit";

const modeSetterSlice = createSlice ({
    name: 'modeSetter',
    initialState: {
        darkMode: false,
    },
    reducers: {
        isDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    }
});

export const selectModeState = (state) => state.modeSetter.darkMode;

export const {isDarkMode} = modeSetterSlice.actions;

export default modeSetterSlice.reducer;