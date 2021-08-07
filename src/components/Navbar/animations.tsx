import anime from 'animejs';

export const menuAnimation = (navMenuRef, styles) => {
    anime.timeline({
        targets: `.${styles.divider}`,
        width: navMenuRef.current?.getBoundingClientRect().width,
        easing: "easeOutQuart",
        delay: 100,
        duration: 1700,
      }).add({
        targets: [`.${styles.selector}`, `.${styles.menuItem} a`],
        delay: anime.stagger(100, {direction: 'reverse'}),
        easing: "easeOutQuart",
        opacity: [0, 1]
      })
}
