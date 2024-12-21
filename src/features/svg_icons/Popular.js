import React from "react";
import styles from "./IconsStyle.module.css";

function Popular ({seletedMainTopic}) {return (
        <div>
            <svg
                className={(seletedMainTopic === "Popular") ?
                    `${styles.topicIcons} ${styles.topicIconsActive}` : styles.topicIcons}
                width="100mm"
                height="100mm"
                version="1.1"
                viewBox="0 0 99.999999 100"
                id="svg1"
                xmlns="http://www.w3.org/2000/svg">
                <defs
                    id="defs1" />
                <path
                    d="M 50.018652,4.6684489 A 46.898041,45.302872 0 0 0 3.1207397,49.97111 46.898041,45.302872 0 0 0 17.755505,82.710197 L 42.976705,46.428174 20.973397,31.297314 69.422119,21.955249 77.942013,70.499056 55.797111,55.270011 31.20533,91.420776 A 46.898041,45.302872 0 0 0 50.018652,95.274288 46.898041,45.302872 0 0 0 96.916565,49.97111 46.898041,45.302872 0 0 0 50.018652,4.6684489 Z"
                    fill="currentColor"
                    stroke="#000000"
                    strokeWidth="0.317114"
                    strokeLinecap="square"
                    id="path11" />
            </svg>
        </div>
    )
}

export {Popular};