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
    windowHeight: number
}

const slideStore = create<SlideState>((set, get) => ({
    slides: ["Home", "About", "Work", "Contact"],
    top: 0,
    currentSlide: 0,
    currentProgress: 0,
    pages: 3,
    zoom: 75,
    sections: 3,
    slideOffset: 0,
    windowHeight: window.innerHeight,
    slideTo: (index) => set(state => ({currentSlide: index})),
    updateOffset: (top) => {
        const slideDistance = top / get().windowHeight;
        const currentIndex = Math.round(slideDistance);

        set(state => ({slideOffset: top}));
        set(state => ({currentProgress:slideDistance % 1.0}));
        if (get().currentSlide !== currentIndex){
            set(state => ({currentSlide: currentIndex}))
        }
    }
}))

export default slideStore

