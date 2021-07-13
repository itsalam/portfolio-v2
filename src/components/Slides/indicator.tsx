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
          const className = classNames([styles.dot], {
              [styles.selected]: currentSlide === index
          })
          return <Indicator 
            {...{className}} 
            key={index}
            isCurrent={currentSlide === index}
            progress={progress}
            stroke={3}
            radius={10}
          />;
        })}
      </div>
    );
  }
  

function Indicator(props) {
    let { radius, stroke, progress, isCurrent, ...otherProps } = props;
    progress = isCurrent? progress : 0;

    const normalizedRadius = (radius - stroke * 2);
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
          strokeWidth={ stroke*2 }
          strokeDasharray={ circumference + ' ' + circumference }
          style={ { strokeDashoffset } }
          r={ normalizedRadius }
          cx={ radius }
          cy={ radius }
          />
        <circle
          stroke={styles.menuColor}
          fill="transparent"
          strokeWidth={ stroke/2 }
          strokeDasharray={ circumference + ' ' + circumference }
          r={ normalizedRadius }
          cx={ radius }
          cy={ radius }
          />
        {isCurrent &&         
        <circle
          fill={styles.menuColor}
          r={ normalizedRadius/2 }
          cx={ radius }
          cy={ radius }
          />
        }
      </svg>
    );
}