import React, { memo, useContext, useEffect, useRef } from "react";
import Home from "../Slides/Home";
import * as styles from "./Hero.module.scss";
import { Canvas } from "@react-three/fiber";
import slideStore from "../../store/slices/slides";
import Slide, { SlideContent } from "../Slides";
import Background from "./background";
import About from "../Slides/About";

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
        className={styles.canvas}
      >
          <Slide factor={2} offset={0}>
            <SlideContent>
              <Home />
            </SlideContent>
          </Slide>
          <Slide factor={2} offset={1}>
            <SlideContent>
              <About />
            </SlideContent>
          </Slide>
          <Slide factor={-.1} offset={-.0}>
            <Background />
          </Slide>
      </Canvas>
      <div className={styles.scrollArea} onScroll={onScroll} >
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </>
  );
}
