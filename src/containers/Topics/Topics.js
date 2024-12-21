import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectListTopics, collectFetchTopic, loadTopics, collectMainTopicClick } from "./topicsSlice";
import { Topic } from "../../features/Topic/Topic";
import { Home } from "../../features/svg_icons/Home";
import { Popular } from "../../features/svg_icons/Popular";
import { PointUp } from "../../features/svg_icons/PointUp";
import { TopicsIcons } from "../../features/svg_icons/TopicsIcons";
import styles from "./Topics.module.css";

function Topics() {
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
    
    const handleTopicClick = (event) => {
        if (event.target.id === "Home") {
            collectSelectedTopic("/r/Home/");
        } else if (event.target.id === "Popular") {
            collectSelectedTopic("/r/Popular/");
        }
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
        <div className={styles.topics}>
            <div className={styles.mainTopics}>
                <div className={styles.eachMainTopics}>
                    <Home />
                    <h4
                        onClick={handleTopicClick}
                        id="Home"
                    >
                         Home
                    </h4>
                </div>
                <div className={styles.eachMainTopics}>
                    <Popular />
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
                className={styles.topicsDropDown}
            >
                <div className={styles.topicsTitle} >
                    <TopicsIcons />
                    <h3
                    >
                        Topics
                    </h3>
                </div>
                <div className={shouldDisplayTopic ? styles.dropDownArrowUp : styles.dropDownArrowDown} >
                    <PointUp />
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