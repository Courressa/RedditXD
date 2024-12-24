import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectListTopics, collectFetchTopic, loadTopics, collectMainTopicClick } from "./topicsSlice";
import { Topic } from "../../features/Topic/Topic";
import { Home } from "../../features/svg_icons/Home";
import { Popular } from "../../features/svg_icons/Popular";
import { PointUp } from "../../features/svg_icons/PointUp";
import { TopicsIcons } from "../../features/svg_icons/TopicsIcons";
import styles from "./Topics.module.css";

function Topics({darkModeSwitch}) {
    const dispatch = useDispatch();
    const listTopics = useSelector(selectListTopics);
    const collectSelectedTopic = (topic) => {
        dispatch(collectFetchTopic(topic));
        dispatch(collectMainTopicClick());
    };

    useEffect(() => {
        dispatch(loadTopics());
    }, [dispatch])
    //console.log("selector topics  outside use effect", listTopics);

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
    //console.log("clicked?", shouldDisplayTopic);
   /* let subtopic;
   redditMainTopics.map(topic =>
    {switch (topic) {
        case "Internet Culture":
            subtopic = internetCultureSubTopics.map(ICsubtopic => (
                <div>{ICsubtopic}</div>
            ));
            break;
        case "Games":
            subtopic = gamesSubTopics.map(Gsubtopic => (
                <div>{Gsubtopic}</div>
            ));
            break;
        case "Q&As":
            subtopic = qAndAsSubTopics.map(ICsubtopic => (
                <div>{ICsubtopic}</div>
            ));
            break;
        case "Technology":
            subtopic = technologySubTopics.map(ICsubtopic => (
                <div>{ICsubtopic}</div>
            ));
            break;
        case "Pop Culture":
            subtopic = popCultureSubTopics.map(ICsubtopic => (
                <div>{ICsubtopic}</div>
            ));
            break;
        case "Movies & TV":
            subtopic = moviesAndTVSubTopics.map(ICsubtopic => (
                <div>{ICsubtopic}</div>
            ));
            break;
        default:
            break;
    }}
    );
    console.log(subtopic);*/
    //{shouldDisplayTopic ? <PointUp /> : <PointDown />}
    /*<div className={shouldDisplayTopic ? styles.dropDownArrowUp : styles.dropDownArrowDown} >
            <PointDown />
        </div> 
    {shouldDisplayTopic ? <PointUp
                    shouldDisplayTopic={shouldDisplayTopic}
                /> : <PointDown
                    shouldDisplayTopic={shouldDisplayTopic}
                />}    
        
    */
    return (
        <div className={darkModeSwitch ? styles.topicsDarkMode : styles.topics}>
            <div className={styles.mainTopics}>
                <div
                    className={darkModeSwitch ? styles.eachMainTopicsDarkMode : styles.eachMainTopics}
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
                    className={darkModeSwitch ? styles.eachMainTopicsDarkMode : styles.eachMainTopics}
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
                className={darkModeSwitch ? styles.topicsDropDownDarkMode : styles.topicsDropDown}
            >
                <div className={styles.topicsTitle} >
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
            
            <div className={shouldDisplayTopic ? styles.mappedMainTopics : ""}>
                
                {listTopics.map((topicArr, index) => (
                    <Topic 
                        key={index}
                        topic={topicArr}
                        collectSelectedTopic={collectSelectedTopic}
                        shouldDisplayTopic={shouldDisplayTopic}
                    />
                ))}
                
            </div>
        </div>
    );
};

export { Topics };