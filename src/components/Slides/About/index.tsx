import React, { Fragment, useEffect } from "react";
import * as styles from "./About.module.scss";

const textBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.."

export default function About(props){

    return (
        <div className={styles.aboutBody}>
            <div className={styles.header}>
                <h2 className={styles.title}>About</h2>
                <div className={styles.divider}/>
            </div>
            <div className={styles.mainText}>
                {textBody}
            </div>
        </div>
    )
}