import anime from "animejs";

const SPIN_DURATION = 1500;
const LOOP_DELAY = 3500;

const titleAnimation = {
  top: ["0%", "-100%"],
  middle: ["100%", "0%"],
  bottom: ["100%", "100%"],
};

const getLoopValue = (i, offset) => {
  const animations = Object.values(titleAnimation);
  const len = animations.length;
  i += offset;
  const value = animations[i % len];
  return value;
};

const translateY = (offset) => ({
  translateY: (el, i, l) => getLoopValue(i, offset),
  duration: SPIN_DURATION,
});

export const titleLoop = (styles) => {
  anime
    .timeline({
      loop: true,
    })
    .add({
      targets: `.${styles.titleContent} .${styles.title}`,
      keyframes: [translateY(0), translateY(2), translateY(1)],
      delay: LOOP_DELAY,
      easing: "easeOutQuart",
    })
    .add(
      {
        targets: `.${styles.a}`,
        keyframes: [translateY(1), { ...translateY(0), delay: SPIN_DURATION }],
        delay: LOOP_DELAY,
        easing: "easeOutQuart",
      },
      0
    );
};

export const revealText = (direction:string , targets: string, timeline?) => {

  let props = {
    targets: document.querySelectorAll(targets),
    translateY: direction == "up" ? [200, 0]: [-200, 0],
    easing: "easeOutQuart",
    delay: anime.stagger(150, { easing: "easeInQuad" }),
  }
  return timeline? timeline.add(props) : anime.timeline({...props, autoPlay: false})
};
