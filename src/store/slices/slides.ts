import { useThree } from "@react-three/fiber";
import { createSlice } from "@reduxjs/toolkit";
import React, { createContext, createRef, useContext } from "react";
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

const offsetContext = createContext(0)

export function useBlock() {
    const sections = slideStore(state => state.sections)
    const pages = slideStore(state => state.pages)
    const { size, viewport } = useThree()
    const offset = useContext(offsetContext)
    const viewportWidth = viewport.width
    const viewportHeight = viewport.height
    const canvasWidth = viewportWidth
    const canvasHeight = viewportHeight
    const mobile = size.width < 700
    const margin = canvasWidth * (mobile ? 0.2 : 0.1)
    const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.5)
    const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1))
    return {
      viewport,
      offset,
      offsetContext,
      viewportWidth,
      viewportHeight,
      canvasWidth,
      canvasHeight,
      mobile,
      margin,
      contentMaxWidth,
      sectionHeight,
      size
    }
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

