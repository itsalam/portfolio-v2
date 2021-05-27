import React, { Fragment, useEffect } from "react";
import anime from "animejs";
import * as styles from "./Home.module.scss";
import classNames from "classnames";
import { titleLoop, revealHome } from "./animations";
import { Html } from "@react-three/drei";

const GREETING = "Hey there, I’m";
const TITLES = ["Vincent Lam", "Full-Stack Developer", "Front-end Developer"];
const BODY =
  "I’m a developer based in Vancouver with a knack for developing web applications for internal company use. I like building things that are both elegant and robust with the most modern tools available.";

export default function Home() {
  useEffect(() => {
    revealHome(styles);
    titleLoop(styles);
  }, []);

  return (
    
    <Html>
      <div className={styles.home}>
        <div className={classNames([styles.greeting, styles.revealer])}>
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
              <div className={classNames([styles.title])}>
                <span>
                  {`${title} /`}<br />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={classNames([styles.body, styles.revealer])}>
          <span>{BODY}</span>
        </div>
      </div>
    </Html>
  );
}
