import React from "react";
import Topic from "../../features/Topic/Topic"
import styles from "./Topics.module.css"

function Topics() {
    
    return (
        <div className={styles.topics}>
            <div className={styles.mainTopics}>
                <section>Home</section>
                <section>Popular</section>
            </div>
            <div className={styles.fetchedTopics}>

            </div>
        </div>
    );
};

export { Topics };