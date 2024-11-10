import React from "react";
import { SearchBar } from "../../features/SearchBar/SearchBar";
import { ModeSetter } from "../../features/ModeSetter/ModeSetter";
import styles from "./Banner.module.css"

function Banner() {
    return (
        <div className={styles.banner}>
            <div className={styles.logo}>
                <img src={require("../../images/Logo1.png")} alt="RedditXD Logo" />
                <h1>RedditXD</h1>
            </div>
            <div className={styles.searchBarComp}>
                <SearchBar />
            </div>
            <div className={styles.modeSetterComp}>
                <ModeSetter />
            </div>
        </div>
    );
};

export { Banner };