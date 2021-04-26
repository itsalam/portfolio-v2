import styles from "./Navbar.module.scss";
import "../../styles/fonts.css";
import { Fragment, useEffect, useState } from "react";
import anime from "animejs";
import cn from "classnames";

export default function Navbar() {
  const menu = ["Home", "About", "Work", "Contact"];
  console.log(styles);

  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const divider = <div className={styles.divider} />;

  useEffect(() => {
    anime({});
  }, [hovered]);

  const mouseOverAnimation = (e) => {
    setHovered(e);
  };

  const menuItem = (entry, index) => {
    const classNames = cn(styles.menuItem, {
      [styles.selected]: index === selected,
      [styles.hovered]: index === hovered,
    });
    return (
      <Fragment>
        <div
          className={classNames}
          onMouseEnter={() => mouseOverAnimation(index)}
        >
          {entry}
        </div>
        {divider}
      </Fragment>
    );
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>V</div>
      <div className={styles.verticalDivider} />
      <div className={styles.navbarMenu}>
        {menu.map((entry, index) => menuItem(entry, index))}
      </div>
      <div className={styles.selector}/>
    </div>
  );
}
