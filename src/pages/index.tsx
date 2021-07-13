import React from "react";
import { Helmet } from "react-helmet";
import * as styles from "../styles/Index.module.scss";
import "../styles/globals.scss";
import "../styles/fonts.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Background";
import SlideIndicator from "../components/Slides/indicator";
import Home from "./Home";
import About from "./About";
import { Canvas } from "@react-three/fiber";
import slideStore from "../store/slices/slides";
import Slide, { SlideContent } from "../components/Slides";
import Background from "../components/Background";
import Works from "./Works";

export default function Index() {
  const zoom = slideStore((state) => state.zoom);
  const pages = slideStore((state) => state.pages);
  const updateOffset = slideStore((store) => store.updateOffset);
  const onScroll = (e) => updateOffset(e.target.scrollTop);

  return (
    <div className={styles.application}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0"
        ></meta>
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Navbar />
      <SlideIndicator />
      <main className={styles.main}>
          <Canvas
            linear
            orthographic
            camera={{ zoom, position: [0, 0, 500] }}
            className={styles.canvas}
          >
            <Slide factor={2} offset={0}>
              <SlideContent alignLeft>
                <Home slideIndex={0} />
              </SlideContent>
            </Slide>
            <Slide factor={2} offset={1}>
              <SlideContent>
                <About slideIndex={1} />
              </SlideContent>
            </Slide>
            <Slide factor={2} offset={2}>
              <SlideContent alignLeft>
                <Works slideIndex={2} />
              </SlideContent>
            </Slide>
            <Slide factor={-0.1} offset={0}>
              <Background />
            </Slide>
          </Canvas>

        <div className={styles.scrollArea} onScroll={onScroll}>
          <div style={{ height: `${pages * 100}vh` }} />
        </div>
      </main>
    </div>
  );
}
