import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { SearchBar } from "../../features/SearchBar/SearchBar";
import { ModeSetter } from "../../features/ModeSetter/ModeSetter";
import { Menu } from "../../features/svg_icons/Menu";
import { collectUserSearch, collectUserSearchClick, collectmenuDropdownClick, selectMenuDropdownClick } from "./bannerSlice";
import styles from "./Banner.module.css";

function Banner({darkModeSwitch}) {
    const dispatch = useDispatch();
    const menuDropdownState = useSelector(selectMenuDropdownClick);

    const userSearch = (toSearch) => {
        dispatch(collectUserSearch(toSearch));
    };

    const userSearchClick = () => {
        dispatch(collectUserSearchClick());
    };

    const menuDropdownClick = () => {
        dispatch(collectmenuDropdownClick());
    };

    return (
        <div data-testid="banner" className={darkModeSwitch ? styles.bannerDarkMode : styles.banner}>
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
            <div>
                <div className={styles.modeSetterComp}>
                    <ModeSetter />
                </div>
                <div
                    className={styles.menu}
                    onClick={menuDropdownClick}
                >
                    <Menu 
                        darkModeSwitch={darkModeSwitch}
                        menuDropdownState={menuDropdownState}
                    />
                </div>
            </div>
            
        </div>
    );
};

export { Banner };