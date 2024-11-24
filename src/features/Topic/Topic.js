import React, { useState } from "react";
import styles from "./Topic.module.css";
import { internetCultureSubTopics, gamesSubTopics, qAndAsSubTopics, technologySubTopics, popCultureSubTopics, moviesAndTVSubTopics } from "../../containers/Topics/listOfRedditTopics";

function Topic({topic}) {
    let addSubtopic;
    if (topic.subtopics) {
        addSubtopic = topic.subtopics.map((subtopic, index) => (
            <h5 key={index} >{subtopic}</h5>
    ));
    }

    const [shouldDisplaySubTopic, setShouldDisplaySubTopic] = useState(false);
    const handleClick = (event) => {
        console.log("clicked", event.target.id);
        if (shouldDisplaySubTopic == false) {
            setShouldDisplaySubTopic(true);
        } else {
            setShouldDisplaySubTopic(false);
        }
    }

    return (
        <div>
            <h4 onClick={handleClick} id={topic.mainTopic}>
                {topic.icon} {topic.mainTopic}
            </h4>
            <div className={(shouldDisplaySubTopic && addSubtopic) ? styles.subTopicList : ""} >
                {shouldDisplaySubTopic ? addSubtopic: ""}
            </div>
        </div>
    );
};

export { Topic };