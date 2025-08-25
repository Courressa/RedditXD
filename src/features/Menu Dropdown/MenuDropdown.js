import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectListTopics, collectFetchTopic, loadTopics, collectMainTopicClick } from "../../containers/Topics/topicsSlice";
import { Topic } from "../../features/Topic/Topic";
import { Home } from "../../features/svg_icons/Home";
import { Popular } from "../../features/svg_icons/Popular";
import { PointUp } from "../../features/svg_icons/PointUp";
import { TopicsIcons } from "../../features/svg_icons/TopicsIcons";
import { ModeSetter } from "../ModeSetter/ModeSetter";
import styles from "./MenuDropdown.module.css";

function MenuDropdown({darkModeSwitch, menuDropdownSwitch}) {
    const dispatch = useDispatch();
    const listTopics = useSelector(selectListTopics) || [];
    const collectSelectedTopic = (topic) => {
        dispatch(collectFetchTopic(topic));
        dispatch(collectMainTopicClick());
    };

    useEffect(() => {
        dispatch(loadTopics());
    }, [dispatch]);

    const [shouldDisplayTopic, setShouldDisplayTopic] = useState(false);
    const handleClick = () => {
        if (shouldDisplayTopic === false) {
            setShouldDisplayTopic(true);
        } else if (shouldDisplayTopic === true) {
            setShouldDisplayTopic(false);
        }
    }
    
    const [seletedMainTopic, setSeletedMainTopic] = useState("");
    const handleTopicClick = (event) => {
        if (event.target.id === "Home") {
            collectSelectedTopic("/r/Home/");
        } else if (event.target.id === "Popular") {
            collectSelectedTopic("/r/Popular/");
        }
        setSeletedMainTopic(event.target.id);
    }

    let menuDropdownStyle;

    if ((menuDropdownSwitch) && (!darkModeSwitch)) {
        menuDropdownStyle = styles.menu;
    } else if ((menuDropdownSwitch) && (darkModeSwitch)) {
        menuDropdownStyle = styles.menuDarkMode;
    } else if (!menuDropdownSwitch) {
        menuDropdownStyle = styles.menuNotVisible;
    };
                 
    return (
        <div data-testid="menu-dropdown" className={menuDropdownStyle}>
            <div>
                <ModeSetter />
            </div>
            <div className={darkModeSwitch ? styles.topicsMenuDarkMode : styles.topicsMenu}>
                <div>
                    <div
                        className={darkModeSwitch ? styles.eachMainTopicsMenuDarkMode : styles.eachMainTopicsMenu}
                        onClick={handleTopicClick}
                        id="Home"
                    >
                        <Home
                            seletedMainTopic={seletedMainTopic}
                            darkModeSwitch={darkModeSwitch}
                        />
                        <h4
                            onClick={handleTopicClick}
                            id="Home"
                        >
                            Home
                        </h4>
                    </div>
                    <div 
                        className={darkModeSwitch ? styles.eachMainTopicsMenuDarkMode : styles.eachMainTopicsMenu}
                        onClick={handleTopicClick}
                        id="Popular"
                    >
                        <Popular
                            darkModeSwitch={darkModeSwitch}
                            seletedMainTopic={seletedMainTopic}
                        />
                        <h4
                            onClick={handleTopicClick}
                            id="Popular"
                        >
                            Popular
                        </h4>
                    </div>
                </div>
                <div
                    onClick={handleClick}
                    className={darkModeSwitch ? styles.topicsDropDownDarkMode : styles.topicsMenuDropDown}
                >
                    <div className={styles.topicsMenuTitle} >
                        <TopicsIcons
                            darkModeSwitch={darkModeSwitch}
                        />
                        <h3
                        >
                            Topics
                        </h3>
                    </div>
                    <div className={shouldDisplayTopic ? styles.dropDownArrowUp : styles.dropDownArrowDown} >
                        <PointUp
                            darkModeSwitch={darkModeSwitch}
                        />
                    </div>
                    
                </div>
                
                <div className={shouldDisplayTopic ? styles.mappedMainTopicsMenu : ""}>
                    
                    {listTopics.map((topicArr, index) => (
                        <Topic 
                            key={index}
                            topic={topicArr}
                            collectSelectedTopic={collectSelectedTopic}
                            shouldDisplayTopic={shouldDisplayTopic}
                            darkModeSwitch={darkModeSwitch}
                        />
                    ))}
                    
                </div>
            </div>
            
        </div>
    );
};

export { MenuDropdown };