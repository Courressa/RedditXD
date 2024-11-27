import React, { useState } from "react";
import styles from "./IconsStyle.module.css";

function ArrowUp () {
    const [hoverToggle, setHoverToggle] = useState(false);

    const handleMouseEnter = () => {
        setHoverToggle(true);
    }

    const handleMouseLeave = () => {
        setHoverToggle(false);
    }
    
    return (
        <div >
            <svg
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                className={`${styles.arrow}`}
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
                    stroke={hoverToggle ? "#738a00" : "#000"}
                    strokeWidth="0.314"
                    strokeLinecap="square"
                    d="m 34.798951,94.484233 c -2.323102,-1.608302 -2.859204,-5.182309 -2.859204,-5.182309 l 0.357399,-39.31408 H 3.3476899 L 49.808542,2.825138 96.13537,50.016221 H 67.185913 l 0.357399,39.31408 c 0,0 -0.536102,3.574007 -2.859204,5.182309 -2.323105,1.608304 -9.046705,3.395308 -14.875566,3.38112 -5.82886,-0.01419 -12.686486,-1.801193 -15.009591,-3.409497 z"
                    id="path2" />
            </svg>
        </div>
    )
}

export {ArrowUp};