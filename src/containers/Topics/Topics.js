import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectListTopics, collectFetchTopic, loadTopics } from "./topicsSlice";
import { Topic } from "../../features/Topic/Topic";
import styles from "./Topics.module.css";
import { redditTopics } from "./listOfRedditTopics";
import { Home } from "../../features/svg_icons/Home";
import { Popular } from "../../features/svg_icons/Popular";

function Topics() {
    const dispatch = useDispatch();
    const listTopics = useSelector(selectListTopics);
    const collectSelectedTopic = (topic) => {
        dispatch(collectFetchTopic(topic));
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

    return (
        <div className={styles.topics}>
            <div className={styles.mainTopics}>
                <h4><Home /> Home</h4>
                <h4><Popular /> Popular</h4>
            </div>
            <h3
                onClick={handleClick}
            >
                Topics
            </h3>
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