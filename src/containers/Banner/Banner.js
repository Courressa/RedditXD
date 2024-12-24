import React from "react";
import { useDispatch } from "react-redux";
import { SearchBar } from "../../features/SearchBar/SearchBar";
import { ModeSetter } from "../../features/ModeSetter/ModeSetter";
import { collectUserSearch, collectUserSearchClick } from "./bannerSlice";
import styles from "./Banner.module.css";

function Banner({darkModeSwitch}) {
    const dispatch = useDispatch()

    const userSearch = (toSearch) => {
        dispatch(collectUserSearch(toSearch));
    };
    const userSearchClick = () => {
        dispatch(collectUserSearchClick());
    }

    return (
        <div className={darkModeSwitch ? styles.bannerDarkMode : styles.banner}>
            <div className={styles.logo}>
                <img src={require("../../images/Logo1.png")} alt="RedditXD Logo" />
                <div className={styles.logo}>
                    <h1>Reddit</h1>
                    <h1 className={styles.logoHighlighted} >XD</h1>
                </div>
                
            </div>
            <div className={styles.searchBarComp}>
                <SearchBar
                    userSearchCollected={userSearch}
                    userSearchClickCollected={userSearchClick}
                />
            </div>
            <div className={styles.modeSetterComp}>
                <ModeSetter />
            </div>
        </div>
    );
};

export { Banner };