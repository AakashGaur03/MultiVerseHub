import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentSidebar: ""
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        updateSidebar(state, action) {
            state.currentSidebar = action.payload;
        }
    }
})

export const { updateSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer;