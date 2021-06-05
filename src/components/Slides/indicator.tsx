import React, {  } from 'react';
import classNames from "classnames";
import { useEffect } from "react";
import anime from "animejs";
import * as styles from "./Slides.module.scss";
import slideStore from '../../store/slices/slides';

export default function SlideIndicators() {
    const currentSlide = slideStore((state) => state.currentSlide);
    const progress = slideStore(state => state.currentProgress)
    const menu = slideStore((state) => state.slides);
  
    useEffect(() => {
      anime({
        targets: `.${styles.selector}`,
        opacity: [0, 1]
      })
    }, [])
  
    useEffect(() => {
      anime({
        targets: `.${styles.selector}:nth-of-type(${currentSlide})`,
        backgroundColor: [`rgba(${styles.menuColor}, 0)`, `rgba(${styles.menuColor}, 1)`]
      })
    }, [currentSlide])
  
    return (
      <div className={styles.menuDots}>
        {menu.map((slideName, index) => {
          const className = classNames([styles.indicator], {
              [styles.selected]: currentSlide === index
          })
          return <Indicator 
            {...{className}} 
            progress={currentSlide === index ? progress : 0}
            stroke={3}
            radius={10}
          />;
        })}
      </div>
    );
  }
  

function Indicator(props) {
    const { radius, stroke, progress, ...otherProps } = props;
    const normalizedRadius = (radius - stroke * 2)
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;
    return (
      <svg
        {...otherProps}
        height={radius * 2}
        width={radius * 2}
        >
        <circle
          stroke={styles.menuColor}
          fill="transparent"
          strokeWidth={ stroke }
          strokeDasharray={ circumference + ' ' + circumference }
          style={ { strokeDashoffset } }
          stroke-width={ stroke }
          r={ normalizedRadius }
          cx={ radius }
          cy={ radius }
          />
        <circle
          stroke={styles.menuColor}
          fill="transparent"
          strokeWidth={ stroke }
          strokeDasharray={ circumference + ' ' + circumference }
          stroke-width={ stroke/2 }
          r={ normalizedRadius }
          cx={ radius }
          cy={ radius }
          />
      </svg>
    );
}