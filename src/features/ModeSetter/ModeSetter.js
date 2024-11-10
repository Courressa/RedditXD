import React from "react";
import { useState } from "react";
import styles from "./ModeSetter.module.css";

function ModeSetter() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const onClick = () => {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <div className={styles.modeSetter}>
            <button
                className={`${styles.toggle} ${isDarkMode ? styles.darkMode : ""}`}
                onClick={onClick}
            >
                <div className={styles.thumb}></div>
            </button>
        </div>
    );
};

export { ModeSetter };