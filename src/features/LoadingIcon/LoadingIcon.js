import React, {useState, useEffect} from "react";
import styles from "./LoadingIcon.module.css"

function LoadingIcon() {
    const [displayWord, setDisplayWord] = useState('')
    let loading = "...."; //first dot is a placeholder as index 0 is skipped

    useEffect(() => {
        let i = 0;

        const typingSetup = setInterval(() => {
            if (i <= loading.length) {
                if (loading[i]) {
                    setDisplayWord((prev) => prev + loading[i])
                }
                
                i++;
                
                if (i === loading.length) {
                    i = 0;
                    setDisplayWord('');
                }
            }
        }, 500)

        return () => clearInterval(typingSetup)
    }, [loading])

    const typeWriter = displayWord.split('');

    return (
        <div className={styles.loadingIcons}>
            <img src={require("../../images/Logo1.png")} alt="RedditXD Logo" />
            <span>{typeWriter}</span>
        </div>
    )
}

export { LoadingIcon };