import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTopics, loadTopics, loadingTopics } from "./topicsSlice";
import { Topic } from "../../features/Topic/Topic";
import styles from "./Topics.module.css";
import { redditTopics } from "./listOfRedditTopics";
import { Home } from "../../features/svg_icons/Home";
import { Popular } from "../../features/svg_icons/Popular";

function Topics() {
    const topicsListData = useSelector(selectTopics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTopics());
    }, []);

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
            <h3>Topics</h3>
            <div className={styles.mainTopics}>
                {redditTopics.map((topicArr, index) => (
                    <Topic 
                        key={index}
                        topic={topicArr}
                    />
                ))}
                
            </div>
        </div>
    );
};

export { Topics };