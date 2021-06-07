import React from "react";
import { Helmet } from "react-helmet"
import * as styles from "../styles/Index.module.scss";
import "../styles/globals.scss";
import "../styles/fonts.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SlideIndicator from "../components/Slides/indicator";

export default function Home() {

  return (
      <div className={styles.application}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name='viewport' 
     content='width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0' ></meta>
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <Navbar />
        <SlideIndicator />
        <main className={styles.main}>
          <Hero />
        </main>
      </div>
  );
}
