import classNames from "classnames";
import React, { Fragment, useEffect } from "react";
import slideStore from "../../store/slices/slides";
import workStore, {WorkExperience}  from "../../store/slices/work";
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

  useEffect(() => {
    if (slideIndex === currentSlide && !hasPlayed) {
      hasPlayed = true;
    }
  }, [currentSlide]);

  const renderTabs = () => {
    return (
      <div className={styles.tabs}>
        {tabs.map<React.ReactNode>((tabStr, index) => (
          <div className={classNames(styles.tabTitle, styles.title, { [styles.selected]: index === selectedTab })}>
            {tabStr}
          </div>
        )).reduce((prevTitle, currTitle) => [
          prevTitle,
          <div className={classNames(styles.subDivider, styles.divider)} />,
          currTitle,
        ])}
      </div>
    );
  };

  const renderMenu = (selectionStrs: string[]) => 
    <div className={styles.menu}>
      {selectionStrs.map((str, index) => 
        <div className={classNames(styles.menuItem, styles.mainText, { [styles.selected]: index === selectedItem })}>{str}</div>
      )}
    </div>;

  const renderWorkContent = (workExperience: WorkExperience) => {
    const title = 
      <div className={classNames(styles.jobTitle, styles.mainText)}>
        <span>{`${workExperience.occupation}`}</span>
        <span>{` @ ${workExperience.title}`}</span>
      </div>
    const subBodyContent = Array.from(workExperience.content).map(({subTitle, subContent}) =>
      <div className={classNames(styles.subContent, styles.mainText)}>
        <div className={styles.subTitle}>
          {subTitle}
        </div>
        <div className={styles.subBody}>
          {subContent.map(line => <div>· {line}</div>)}
        </div>
      </div>
    )
    console.log(subBodyContent)
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
