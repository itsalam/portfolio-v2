import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import cn from "classnames";
import { moveSelector } from "../Navbar/animations";


export default function Menu (props) {
  let {menu, styles, selected, onClick, ...otherProps} = props;
  const selectorRef = useRef(null);
  const menuItemRefs: MutableRefObject<undefined>[] = menu.map(() => useRef(null));

  const selector = <div ref={selectorRef} className={styles.selector} />;
  const divider = <div className={styles.divider} />;

  const [hovered, setHovered] = useState(selected);

  useEffect(() => {
    moveSelector(getMenuCoord(hovered), styles);
  }, [hovered]);

  useEffect(() => {
    moveSelector(getMenuCoord(selected), styles);
    setHovered(selected);
  }, [selected]);

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
    const classNames = cn(
      styles.menuItem, 
      {
        [styles.selected]: index === selected,
        [styles.hovered]: index === hovered,
      }
    );
    return (
        <div
          ref={menuItemRefs[index]}
          className={classNames}
          onMouseEnter={() => mouseOverAnimation(index)}
          onClick={()=> onClick(index)}
        >
          <a>{entry}</a>
        </div>
    );
  };
    
  return <div {...otherProps} onMouseLeave={() => setHovered(selected) }>
    {selector}
    {menu.map((entry, index) => menuItem(entry, index))}
  </div>
}