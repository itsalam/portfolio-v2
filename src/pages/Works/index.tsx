import classNames from "classnames";
import React, { Fragment, useEffect, useRef } from "react";
import Menu from "../../components/Menu";
import slideStore from "../../store/slices/slides";
import workStore, {WorkExperience}  from "../../store/slices/work";
import anime from "animejs";
import * as styles from "./Works.module.scss";

const tabs = ["EXPERIENCE", "PROJECTS"]

export default function Works(props) {
  const { slideIndex } = props;
  const currentSlide = slideStore((state) => state.currentSlide);
  const experiences = workStore((state) => state.experience);
  const experienceMenu = experiences.map(experience => experience.title)
  let hasPlayed = false;

  const [ selectedTab, setSelectedTab ] = React.useState(0);
  const [ selectedItem, setSelectedItem ] = React.useState(0);

  const tabRef = useRef();

  useEffect(() => {
    if (slideIndex === currentSlide && !hasPlayed) {
      hasPlayed = true;
    }
  }, [currentSlide]);

  const onMenuClick = (index) => {
    let loopStarted = false;
    anime({
      targets: `.${styles.workContent}`,
      opacity: [1, 0],  
      duration: 200,
      loop: 2,
      direction: 'alternate',
      easing: "easeOutQuart",
      changeComplete: anim => {
        !loopStarted && setSelectedItem(index);
        loopStarted = true;
      }
    })
  }

  const renderTabs = () => {
    return (
      <Menu 
        ref={tabRef}
        menu={tabs}
        className={styles.tabs}
        customStyles={styles}
        selected={selectedTab}
        onClick={setSelectedTab}
        divider={ <div className={classNames(styles.subDivider, styles.divider)} />}
        itemClass={styles.tabTitle}  
        isOffset
      />
    );
  };

  const renderMenu = (selectionStrs: string[]) => 
    <Menu 
      menu={selectionStrs}
      className={styles.menu}
      customStyles={styles}
      selected={selectedItem} 
      onClick={onMenuClick}
      itemClass={classNames(styles.menuItem, styles.mainText)} 
      selectorClass={styles.menuSelector}
      isOffset
      vertical
    />

  const renderWorkContent = (workExperience: WorkExperience) => {
    const title = 
      <div className={classNames(styles.jobTitle, styles.mainText)}>
        <span>{`${workExperience.occupation}`}</span>
        <span>{` @ ${workExperience.title}`}</span>
      </div>
    const subBodyContent = Array.from(workExperience.content).map(({subTitle, subContent}) =>
      <div className={classNames(styles.subContent, styles.mainText)} key={subTitle}>
        <div className={styles.subTitle}>
          {subTitle}
        </div>
        <div className={styles.subBody}>
          {subContent.map(line => <div key={line}>· {line}</div>)}
        </div>
      </div>
    )
    
    return <div className={styles.workContent}>
      {title}
      {subBodyContent}    
    </div>
  }

  return (
    <div className={styles.aboutBody}>
      <div className={styles.header}>
        <h2 className={styles.title}>Works</h2>
        <div className={styles.divider} />
      </div>
      {renderTabs()} 
      <div className={styles.content}>
        {renderMenu(experienceMenu)}
        {renderWorkContent(experiences[selectedItem])}
      </div>
    </div>
  );
}
