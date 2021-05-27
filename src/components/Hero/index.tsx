import React, { memo, useContext, useEffect, useRef } from "react";
import Home from "../Slides/Home";
import * as styles from "./Hero.module.scss";
import { Canvas } from "@react-three/fiber";
import slideStore, { updateTop } from "../../store/slices/slides";
import Slide, { SlideContent } from "../Slides";
import Background from "./background";
import { useContextBridge } from "@react-three/drei";

export default function Hero() {
  const zoom = slideStore(state => state.zoom)
  const pages = slideStore(state => state.pages)
  const updateOffset = slideStore(store => store.updateOffset)
  const onScroll = (e) => updateOffset(e.target.scrollTop);
  
  return (
    <>
      <Canvas
        linear
        orthographic
        camera={{ zoom, position: [0, 0, 500] }}
      >
          <Slide factor={1.5} offset={0}>
            <SlideContent>
              <Home />
            </SlideContent>
          </Slide>
          <Slide factor={1.5} offset={1}>
            <SlideContent>
              <Home />
            </SlideContent>
          </Slide>
          <Slide factor={1.5} offset={2}>
            <SlideContent>
              <Home />
            </SlideContent>
          </Slide>
          <Slide factor={1.5} offset={3}>
            <SlideContent>
              <Home />
            </SlideContent>
          </Slide>
          <Slide factor={-1} offset={1}>
            <Background />
          </Slide>
      </Canvas>
      <div className={styles.scrollArea} onScroll={onScroll} >
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </>
  );
}
