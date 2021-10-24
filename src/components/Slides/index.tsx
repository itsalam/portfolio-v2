import React, { useRef } from 'react';
import { useEffect } from "react";
import * as styles from "./Slides.module.scss";
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import slideStore, { useBlock } from '../../store/slices/slides';
import { Html } from '@react-three/drei';


export default function Slide({ children, offset, factor, ...props }) {
  const ref = useRef();
  const zoom = slideStore(state => state.zoom)
  const { offset: parentOffset, offsetContext, sectionHeight } = useBlock()
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
    <Html ref={ref} position={[ offset, 0, 0]} className={styles.slideContent}>
      {props.children}
    </Html>
  )
}

