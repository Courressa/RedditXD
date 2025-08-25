import React from "react";
import styles from "./Topic.module.css";

function Topic({topic, collectSelectedTopic, shouldDisplayTopic, darkModeSwitch}) {
   /* let addSubtopic;
    if (topic.subtopics) {
        addSubtopic = topic.subtopics.map((subtopic, index) => (
            <h5 key={index} >{subtopic}</h5>
        ));
    }*/

    const handleClick = () => {
        if (shouldDisplayTopic) {
            collectSelectedTopic(topic.data.url);
        }
    }

   let topicName;
   if (shouldDisplayTopic) {
        topicName = topic.data.display_name;
   }

   if (topicName === "Home" || topicName === "Popular") {
    return;
   }

   let topicListStyle;

    if ((shouldDisplayTopic) && (!darkModeSwitch)) {
        topicListStyle = styles.topicList;
    } else if ((shouldDisplayTopic) && (darkModeSwitch)) {
        topicListStyle = styles.topicListDarkMode;
    } else if (!shouldDisplayTopic) {
        topicListStyle = styles.topicListNotVisible;
    };
    
    return (
        <div 
            className={topicListStyle}
            onClick={handleClick}
        >
            <h3>{topicName}</h3>
        </div>
    );
};

export { Topic };