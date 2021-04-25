import Typed from "typed.js";

export const playTitle = (className) =>
  new Typed(`.${className}`, {
    strings: ["Hi, ^500 nice to meet you. ^200", " Hi, ^200 I'm Vincent Lam."],
    smartBackspace: true,
    typeSpeed: 40,
    backSpeed: 50,
    showCursor: false,
  });

export const playSubtitle = (classname) => {
  
};
