import { createSlice } from "@reduxjs/toolkit";

export const SLIDES = 'slides';

export const slideReducer = createSlice({
    name: SLIDES,
    initialState: {
        slides: ["Home", "About", "Work", "Contact"],
        currentSlide: 0
    },
    reducers: {
        moveSlide: (state, action) => {
            state.currentSlide = action.payload
        }
    }
})

export const { moveSlide } = slideReducer.actions

export default slideReducer.reducer