import React from "react";
import styles from "./IconsStyle.module.css";

function Menu ({darkModeSwitch, menuDropdownState}) {
    let menuStyle;

    if (menuDropdownState && !darkModeSwitch) {
        menuStyle = `${styles.menu} ${styles.menuActive}`;
    } else if (menuDropdownState && darkModeSwitch) {
        menuStyle = `${styles.menuDarkMode} ${styles.menuActiveDarkMode}`;
    } else if (!menuDropdownState && darkModeSwitch) {
        menuStyle = styles.menuDarkMode;
    } else if (!menuDropdownState && !darkModeSwitch) {
        menuStyle = styles.menu;
    };

    return (
        <div>
            <svg
                className={menuStyle}
                width="100mm"
                height="100mm"
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg">
                <g>
                    <rect
                        fill={darkModeSwitch ? "#FFF" : "#000"}
                        x="4.7045"
                        y="14.958"
                        width="90.35"
                        height="15.078"
                        ry="3.4982"/>
                    <rect
                        fill={darkModeSwitch ? "#FFF" : "#000"}
                        x="4.7045"
                        y="40.41"
                        width="90.35"
                        height="15.078"
                        ry="3.4982"/>
                    <rect
                        fill={darkModeSwitch ? "#FFF" : "#000"}
                        x="4.7045"
                        y="65.501"
                        width="90.35"
                        height="15.078"
                        ry="3.4982"/>
                </g>
            </svg>
        </div>
    )
}

export { Menu };