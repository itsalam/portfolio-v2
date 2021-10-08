import React, { Fragment, useEffect } from "react";
import * as styles from "./About.module.scss";
import icons from "../../icons";
import { revealText } from "./animations";
import slideStore from "../../store/slices/slides";

const textBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.."

export default function About(props){
    const {slideIndex} = props;
    const currentSlide = slideStore((state) => state.currentSlide);
    
    let hasPlayed = false;
  
    useEffect(() => {
      if (slideIndex === currentSlide && !hasPlayed){
        var timeline = revealText("up", `.${styles.title}`);
        timeline = revealText("down", `.${styles.mainText}`, timeline)
        hasPlayed = true;
        timeline.play();
      }
    }, [currentSlide])

    const renderIcon = (name, Icon) => {
        return <div className={styles.icon} key={name}>
            <Icon/>
                <p>{name.replace("Icon", "")}</p>
            </div>
    }

    return (
        <div className={styles.aboutBody}>
            <div className={styles.header}>
                <h2 className={styles.title}>About</h2>
                <div className={styles.divider}/>
            </div>
            <div className={styles.mainText}>
                {textBody}
            </div>
            <div className={styles.icons}>
                {
                    Object.entries(icons).map(([name,Icon]) => renderIcon(name, Icon))
                }
            </div>
        </div>
    )
}
