import React from "react";
import { Provider } from "react-redux";
import * as styles from "../styles/Index.module.scss";
import "../styles/globals.scss";
import "../styles/fonts.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { SlideIndicator } from "../components/Slides";
export default function Home() {
  return (
      <div className={styles.container}>
        <Navbar />
        <SlideIndicator />
        <main className={styles.main}>
          <Hero />
        </main>
      </div>
  );
}
