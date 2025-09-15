import React from "react";
import styles from "./IconsStyle.module.css";

function TopicsIcons ({darkModeSwitch}) {
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
            <path
               fill="currentColor"
               stroke={darkModeSwitch ? "#FFF" : "#000"}
               strokeWidth="0.264729"
               strokeLinecap="square"
               d="M 2.4926993,31.897676 23.129454,4.5667314 42.448656,31.786627"
               id="path12" />
            <path
               fill="currentColor"
               stroke={darkModeSwitch ? "#FFF" : "#000"}
               strokeWidth="0.264729"
               strokeLinecap="square"
               d="M 57.248957,32.008623 77.885712,4.677678 97.204914,31.897574"
               id="path12-3" />
            <path
               fill="currentColor"
               stroke={darkModeSwitch ? "#FFF" : "#000"}
               strokeWidth="0.347917"
               strokeLinecap="square"
               d="M 2.5204719,47.191946 H 97.015631 c 0,0 -7.145192,46.968095 -46.979635,46.968095 -39.834443,0 -47.5155241,-46.968095 -47.5155241,-46.968095 z"
               id="path13" />
         </svg>
      </div>
   )
}

export {TopicsIcons};