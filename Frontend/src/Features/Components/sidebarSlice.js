import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentSidebar: "",
    toggleClicked: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        updateSidebar(state, action) {
            state.currentSidebar = action.payload;
        },
        toggleClicked(state, action) {
            state.toggleClicked = action.payload;
        }
    }
})

export const { updateSidebar, toggleClicked } = sidebarSlice.actions

export default sidebarSlice.reducer;