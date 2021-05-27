import { createSlice } from "@reduxjs/toolkit";
import React, { createRef } from "react";
import create from "zustand";

type SlideState = {
    slides: string[]
    currentSlide: number,
    pages: number,
    zoom: number,
    sections: number,
    slideTo: (index: number) => void,
    slideOffset: number,
    updateOffset: (top:number) => void
}

const slideStore = create<SlideState>(set => ({
    slides: ["Home", "About", "Work", "Contact"],
    top: 0,
    currentSlide: 0,
    pages: 3,
    zoom: 75,
    sections: 3,
    slideOffset: 0,
    slideTo: (index) => set(state => ({currentSlide: index})),
    updateOffset: (top) => set(state => ({slideOffset: top}))
}))

export default slideStore

