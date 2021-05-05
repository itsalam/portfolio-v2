import classNames from "classnames";
import { useEffect } from "react";
import { useAppSelector } from "../../redux";
import anime from "animejs";
import styles from "./Slides.module.scss";

export default function SlideIndicator() {
  const currentSlide = useAppSelector((state) => state.slides.currentSlide);
  const menu = useAppSelector((state) => state.slides.slides);

  useEffect(() => {
    anime({
      targets: `.${styles.selector}`,
      opacity: [0, 1]
    })
  }, [])

  return (
    <div className={styles.menuDots}>
      {menu.map((slideName, index) => {
        const className = classNames([styles.selector], {
            [styles.selected]: currentSlide === index
        })
        return <span {...{className}} />;
      })}
    </div>
  );
}
