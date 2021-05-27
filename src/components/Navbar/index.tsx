import React from 'react';
import * as styles from "./Navbar.module.scss";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { menuAnimation, moveSelector } from "./animations";
import LinkedInSvg from "../../icons/linkedin.svg";
import GithubSvg from "../../icons/github.svg";
import slideStore from "../../store/slices/slides";

export default function Navbar() {
  const menu = slideStore(state => state.slides);
  const changeSlide = slideStore(state => state.slideTo);
  const selected = slideStore(state => state.currentSlide);

  const [hovered, setHovered] = useState(0);

  const navMenuRef = useRef(null);
  const selectorRef = useRef(null);
  const menuItemRefs: MutableRefObject<undefined>[] = menu.map((item) =>
    useRef(null)
  );

  const selector = <div ref={selectorRef} className={styles.selector} />;
  const divider = <div className={styles.divider} />;

  useEffect(() => {
    menuAnimation(navMenuRef, styles)
  }, [])

  useEffect(() => {
    moveSelector(getMenuCoord(hovered), styles);
  }, [hovered]);

  const mouseOverAnimation = (e) => {
    setHovered(e);
  };

  const getMenuCoord = (index) => {
    const menuCoords = menuItemRefs[index]?.current?.getBoundingClientRect();
    const selectorCoords = selectorRef.current?.getBoundingClientRect();
    return (menuCoords.left + menuCoords.right) / 2 - selectorCoords.width/2;
  };

  useLayoutEffect(() => {
    const updateSelector = () => selectorRef.current.style.left = `${getMenuCoord(selected)}px`;
    updateSelector();
    window.addEventListener("resize", updateSelector);
    return () => window.removeEventListener('resize', updateSelector);
  }, []);

  const menuItem = (entry, index) => {
    const classNames = cn(styles.menuItem, {
      [styles.selected]: index === selected,
      [styles.hovered]: index === hovered,
    });
    return (
        <div
          ref={menuItemRefs[index]}
          className={classNames}
          onMouseEnter={() => mouseOverAnimation(index)}
          onClick={()=> changeSlide(index)}
        >
          <a>{entry}</a>
        </div>
    );
  };

  return (
    <div className={styles.navbar} onMouseLeave={() => setHovered(selected)}>
      <div className={styles.logo}>V</div>
      <div className={styles.navbarMenu} ref={navMenuRef}>
        {selector}
        {menu.map((entry, index) => menuItem(entry, index))}
      </div>
      <div className={styles.icons}>
        <a><LinkedInSvg/></a>
        <a><GithubSvg/></a>
      </div>
      <span className={styles.verticalDivider}/>
      <span className={styles.horizontalDivider}/>
    </div>
  );
}
