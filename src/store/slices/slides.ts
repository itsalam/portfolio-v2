import { createSlice } from "@reduxjs/toolkit";
import React, { createRef } from "react";
import create from "zustand";

type SlideState = {
    slides: string[]
    currentSlide: number,
    currentProgress: number,
    pages: number,
    zoom: number,
    sections: number,
    slideTo: (index: number) => void,
    slideOffset: number,
    updateOffset: (top:number) => void,
}

const slideStore = create<SlideState>((set, get) => ({
    slides: ["Home", "About", "Work", "Contact"],
    top: 0,
    currentSlide: 0,
    currentProgress: 0,
    pages: 2,
    zoom: 75,
    sections: 2,
    slideOffset: 0,
    slideTo: (index) => set(state => ({currentSlide: index})),
    updateOffset: (top) => {
        const slideDistance = top / window.innerHeight;
        const currentIndex = Math.floor(slideDistance);

        set(() => ({slideOffset: top}));
        set(() => ({currentProgress:slideDistance % 1.0}));
        if (get().currentSlide !== currentIndex){
            set(() => ({currentSlide: currentIndex}))
        }
    }
}))

export default slideStore

