import React, { useState } from "react";
import styles from "./IconsStyle.module.css";

function ArrowDown () {
    const [hoverToggle, setHoverToggle] = useState(false);

    const handleMouseEnter = () => {
        setHoverToggle(true);
    };

    const handleMouseLeave = () => {
        setHoverToggle(false);
    };

    const [clickToggle, setClickToggle] = useState(false);

    const handleClick = () => {
        if (!clickToggle) {
            setClickToggle(true);
        } else if (clickToggle) {
            setClickToggle(false);
        }
        
    }
    
    return (
        <div>
            <svg
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                className={clickToggle ? styles.arrowDownClicked : styles.arrow}
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
                fillOpacity="1"
                stroke={hoverToggle ? "#8a0073" : "#000"}
                strokeWidth="0.314"
                strokeLinecap="square"
                d="m 34.867285,6.1404004 c -2.323102,1.608302 -2.859204,5.1823086 -2.859204,5.1823086 l 0.357399,39.31408 H 3.416024 L 49.876876,97.799495 96.203702,50.608412 H 67.254247 l 0.357399,-39.31408 c 0,0 -0.536102,-3.5740066 -2.859204,-5.1823086 -2.323105,-1.608304 -9.046705,-3.395308 -14.875566,-3.38112 -5.82886,0.01419 -12.686486,1.801193 -15.009591,3.409497 z"
                id="path2-3" />
            </svg>
        </div>
    )
}

export default ArrowDown;