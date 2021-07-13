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
import LinkedInSvg from "../../icons/social-media/linkedin.svg";
import GithubSvg from "../../icons/social-media/github.svg";
import slideStore from "../../store/slices/slides";
import Menu from '../Menu';

export default function Navbar() {
  const menu = slideStore(state => state.slides);
  const changeSlide = slideStore(state => state.slideTo);
  const selected = slideStore(state => state.currentSlide);

  const navMenuRef = useRef(null);

  useEffect(() => {
    menuAnimation(navMenuRef, styles)
  }, [])

  return (
    <div className={styles.navbar} >
      <div className={styles.logo}>V</div>
      <Menu ref={navMenuRef} className={styles.navbarMenu} styles={styles} menu={menu} onClick={changeSlide} selected={selected}/>
      <div className={styles.icons}>
        <a><LinkedInSvg/></a>
        <a><GithubSvg/></a>
      </div>
      <span className={styles.verticalDivider}/>
      <span className={styles.horizontalDivider}/>
    </div>
  );
}
