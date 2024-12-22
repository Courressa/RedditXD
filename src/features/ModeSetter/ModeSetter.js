import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isDarkMode, selectModeState } from "./modeSetterSlice";
import styles from "./ModeSetter.module.css";

function ModeSetter() {
    const dispatch = useDispatch();
    const modeState = useSelector(selectModeState);
    console.log("setter Mode?", modeState);
    const onClick = () => {
        dispatch(isDarkMode());
    }

    return (
        <div className={styles.modeSetter}>
            <button
                className={`${styles.toggle} ${modeState ? styles.darkMode : ""}`}
                onClick={onClick}
            >
                <div className={styles.thumb}></div>
            </button>
        </div>
    );
};

export { ModeSetter };