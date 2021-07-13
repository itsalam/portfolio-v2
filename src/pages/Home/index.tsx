import React, { Fragment, useEffect, useState } from "react";
import * as styles from "./Home.module.scss";
import classNames from "classnames";
import { titleLoop, revealHome } from "./animations";
import slideStore from "../../store/slices/slides";

const GREETING = "Hey there, I’m";
const TITLES = ["Vincent Lam", "Full-Stack Developer", "Front-end Developer"];
const BODY =
  "I’m a developer based in Vancouver with a knack for developing web applications for internal company use. I like building things that are both elegant and robust with the most modern tools available.";

export default function Home(props: { slideIndex: number}) {
  const {slideIndex} = props;
  const currentSlide = slideStore((state) => state.currentSlide);
  
  let [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (slideIndex === currentSlide && !hasPlayed){
      revealHome(styles);
      setHasPlayed(true);
    }
  }, [currentSlide])

  useEffect(() => {
      titleLoop(styles);
  }, []);

  return (
    <div className={styles.home}>
      <div className={classNames([styles.revealer, styles.mainText])}>
        <span>
          {GREETING}
          <div className={styles.a}> (a)</div>
        </span>
      </div>
      <div className={classNames([styles.titles, styles.revealer])}>
        <span className={classNames([styles.title, styles.titlePlaceholder])}>
          FULL_STACK_DEV
        </span>
        <div className={styles.titleContent}>
          {TITLES.map((title) => (
            <div className={classNames([styles.title])} key={title}>
              <span>
                {`${title} /`}<br />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={classNames([styles.revealer,  styles.mainText])}>
        <span>{BODY}</span>
      </div>
    </div>
  );
}
