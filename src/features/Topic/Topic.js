import React, { useState } from "react";
import styles from "./Topic.module.css";
import { internetCultureSubTopics, gamesSubTopics, qAndAsSubTopics, technologySubTopics, popCultureSubTopics, moviesAndTVSubTopics } from "../../containers/Topics/listOfRedditTopics";

function Topic({topic, collectSelectedTopic, shouldDisplayTopic}) {
   /* let addSubtopic;
    if (topic.subtopics) {
        addSubtopic = topic.subtopics.map((subtopic, index) => (
            <h5 key={index} >{subtopic}</h5>
        ));
    }*/

    const handleClick = () => {
        console.log("clicked", topic.data.url);
        collectSelectedTopic(topic.data.url);
    }
   let topicName;
   if (shouldDisplayTopic) {
        topicName = topic.data.display_name;
   }

   if (topicName === "Home" || topicName === "Popular") {
    return;
   }

    return (
        <div 
            className={shouldDisplayTopic ? styles.topicList : styles.topicListNotVisible}
            onClick={handleClick}
        >
            <h3>{topicName}</h3>
            <div  >
                
            </div>
        </div>
    );
};

export { Topic };