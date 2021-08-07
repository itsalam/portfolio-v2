import React, { createContext, useContext, useRef, useState } from 'react';
import classNames from "classnames";
import { useEffect } from "react";
import anime from "animejs";
import * as styles from "./Slides.module.scss";
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three';
import { Provider, ReactReduxContext } from 'react-redux';
import slideStore from '../../store/slices/slides';
import { Html } from '@react-three/drei';

const offsetContext = createContext(0)

export default function Slide({ children, offset, factor, ...props }) {
  const ref = useRef();
  const zoom = slideStore(state => state.zoom)
  const { offset: parentOffset, sectionHeight } = useBlock()
  const curTop = slideStore(state => state.slideOffset);
  offset = offset ?? parentOffset
  
  useFrame(() => {
    const curY = ref.current.position.y
    ref.current.position.y = MathUtils.lerp(curY, (curTop / zoom) * factor, 0.1)
  })
  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
        <group ref={ref}>
            {children}
        </group>
      </group>
    </offsetContext.Provider>
  )
}

export function SlideContent(props) {
  const { alignLeft } = props;
  const ref = useRef();
  const { contentMaxWidth, canvasWidth, margin, size } = useBlock()
  const offset = (margin + (alignLeft? 0:contentMaxWidth)) - (canvasWidth / 2)
  
  useEffect(() => {
    const adjustSlide = () => {
      if (ref.current && ref.current.clientHeight > size.height /2 ){
        ref.current.style.top = `calc(${styles.navbarSize} - ${(ref.current.getBoundingClientRect().height/2)}px)`;
      }
    }
    adjustSlide()
    window.addEventListener("resize", adjustSlide)
    return () => window.removeEventListener("resize", adjustSlide)
  }, [ref.current])

  return (
    <Html ref={ref} position={[ alignLeft? offset: -offset, 0, 0]} className={styles.slideContent}>
      {props.children}
    </Html>
  )
}

function useBlock() {
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