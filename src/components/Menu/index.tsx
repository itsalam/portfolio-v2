import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import anime from "animejs";
import * as styles from "./Menu.module.scss";
import _ from "lodash";

type MenuProps = {
  menu: string[];
  customStyles;
  selected: number;
  divider?: JSX.Element;
  onClick?: (index) => any;
  onHover?: (index) => any;
  itemClass?: string;
  selectorClass?: string;
  isOffset?: boolean;
  vertical?: boolean;
  hideSelector?: boolean;
  [key: string]: any;
};

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (props: MenuProps, ref) => {
    let {
      menu,
      customStyles,
      selected,
      onClick,
      onHovered,
      divider,
      itemClass,
      selectorClass,
      isOffset,
      hideSelector,
      vertical,
      ...otherProps
    } = props;
    ref = ref ?? useRef(null);
    const selectorRef = useRef(null);
    const menuItemRefs: MutableRefObject<undefined>[] = menu.map(() =>
      useRef(null)
    );
    const [hovered, setHovered] = useState(selected);
    const start = vertical? "top" : "left";
    const end = vertical? "bottom" : "right";
    const size = vertical? "height" : "width";

    const selectorID = _.uniqueId("selector");
    const selector = (
      <div
        id={selectorID}
        ref={selectorRef}
        className={selectorClass ?? styles.selector}
      />
    );

    const moveSelector = (moveVal, ) => {
      anime({
        targets: `#${selectorID}`,
        [start]: moveVal,
        duration: 400,
        easing: "easeOutQuart",
      });
    };

    useEffect(() => {
      moveSelector(getMenuCoord(hovered));
      onHovered && onHovered(hovered);
    }, [hovered]);

    useEffect(() => {
      moveSelector(getMenuCoord(selected));
      setHovered(selected);
    }, [selected]);

    const mouseOverAnimation = (e) => {
      setHovered(e);
    };

    const getMenuCoord = (index) => {
      const menuCoords = menuItemRefs[index]?.current?.getBoundingClientRect();
      const selectorCoords = selectorRef.current?.getBoundingClientRect();
      const offset = isOffset ? ref.current.getBoundingClientRect()[start] : 0;
      return (
        (menuCoords[start] + menuCoords[end]) / 2 -
        selectorCoords[size] / 2 -
        offset
      );
    };

    useLayoutEffect(() => {
      const updateSelector = () =>
        (selectorRef.current.style[start] = `${getMenuCoord(selected)}px`);
      updateSelector();
      window.addEventListener("resize", updateSelector);
      return () => window.removeEventListener("resize", updateSelector);
    }, []);

    const menuItem = (entry, index) => {
      itemClass = itemClass ?? customStyles.menuItem;
      const classNames = cn(itemClass, {
        [customStyles.selected]: index === selected,
        [customStyles.hovered]: index === hovered,
      });
      return (
        <div
          key={index}
          ref={menuItemRefs[index]}
          className={classNames}
          onMouseEnter={() => mouseOverAnimation(index)}
          onClick={() => onClick(index)}
        >
          <a>{entry}</a>
        </div>
      );
    };

    const menuList = () => {
      let menuElement: React.ReactNode[] = menu.map((entry, index) =>
        menuItem(entry, index)
      );
      return divider
        ? menuElement.reduce((prevTitle, currTitle) => [
            prevTitle,
            divider,
            currTitle,
          ])
        : menuElement;
    };

    return (
      <div {...otherProps} onMouseLeave={() => setHovered(selected)} ref={ref}>
        {selector}
        {menuList()}
      </div>
    );
  }
);

export default Menu;
