import React from "react";
import styles from "./IconsStyle.module.css";

function PointUp ({darkModeSwitch}) {
    
    return (
        <div>
            <svg
                className={styles.topicIcons}
                width="100mm"
                height="100mm"
                version="1.1"
                viewBox="0 0 99.999999 100"
                id="svg1"
                xmlns="http://www.w3.org/2000/svg">
                <defs
                    id="defs1" />
                <g
                    id="layer3">
                    <path
                    fill="none"
                    stroke={darkModeSwitch ? "#FFF" : "#000"}
                    strokeWidth="1"
                    strokeLinecap="square"
                    d="M 3.3223531,60.963496 50.024218,3.611649 96.674298,60.662437"
                    id="path5" />
                </g>
            </svg>
        </div>
    )
}

export { PointUp };