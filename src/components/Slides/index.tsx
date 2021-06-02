import React, { createContext, useContext, useRef } from 'react';
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
  const { contentMaxWidth, canvasWidth, margin } = useBlock()
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2
  const aspect = 5

  return (
    <Html position={[ alignRight, 0, 0]} className={styles.slideContent}>
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
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6)
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
    sectionHeight
  }
}