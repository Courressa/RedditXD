import React, { useRef, useEffect } from "react";
import styles from "./Post.module.css";
import Hls from 'hls.js';
import { ArrowUp } from "../svg_icons/ArrowUp";
import { ArrowDown } from "../svg_icons/ArrowDown";
import { Comments } from "../svg_icons/Comments";


function Post({post}) {
    let prevThumbnail;
    const videoRef = useRef(null);
    useEffect(() => {
        try {
            //plays video preview
            if (post.data.post_hint === "hosted:video") {
                const fetchedVideo = post.data.media.reddit_video.hls_url;
                
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(fetchedVideo);
                    hls.attachMedia(videoRef.current);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoRef.current.play();
                    });
            
                    return () => {
                    hls.destroy();
                    };
                } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                    // For Safari
                    videoRef.current.src = fetchedVideo;
                    videoRef.current.addEventListener('loadedmetadata', () => {
                        videoRef.current.play();
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
        

        
    }, [])
    try {
        //shows image
        if (post.data.post_hint === "image" ) {
            const fetchedImage = post.data.url;
            prevThumbnail = <img src={fetchedImage} />;
        } else if (post.data.post_hint === "hosted:video") {
            prevThumbnail = <video 
                ref={videoRef} 
                controls 
                autoPlay
                muted
                loop
            >
                Your browser does not support the video tag.
            </video>;
        } else if (post.data.post_hint === "rich:video") {
            prevThumbnail = (
                <div className={styles.richVideo}>
                    <img src={post.data.media.oembed.thumbnail_url}/>
                    <a href={post.data.url}>{post.data.url}</a>
                </div>
            );
        } else if (post.data.thumbnail === "self") {
            prevThumbnail = <p>{post.data.selftext}</p>;
        } else if (post.data.url.includes("reddit.com/gallery")) {
            prevThumbnail = <img src={post.data.thumbnail}/>;
        } else {
            prevThumbnail = <a href={post.data.url}>{post.data.url}</a>;
        }
    } catch (error) {
        console.log(error);
    }
    

    const kNumberFormatter = (num) => {
        let formatConverter;
        if (num >= 1000) {
            formatConverter = (num / 1000).toFixed(1) + 'K';
            return formatConverter;
        } else {
            return num;
        }
    };

    const dateFormatter = () => {
        const postTimestamp = post.data.created_utc;
        const currentTime = Date.now();

        // Convert seconds to milliseconds
        const postTime = postTimestamp * 1000;

        const millisecondsDifference = currentTime - postTime;
        const hoursDifference = millisecondsDifference / (1000 * 60 * 60);

        let output;
        if (hoursDifference < 24 && hoursDifference > 1) {
            output = `${Math.floor(hoursDifference)} hrs. ago`;
        } else if (hoursDifference <= 1) {
            output = `${Math.floor(hoursDifference)} hr. ago`;
        } else {
            // Convert the timestamp to a Date object
            const postDate = new Date(postTime);
            // Format the date to a readable string
            output = postDate.toLocaleDateString();
        }

        return output;
    }

    return (
        <div className={styles.post}>
            <section className={styles.postHeader}>
                <h2>{post.data.title}</h2>
                <h4>{dateFormatter()}</h4>
            </section>
            
            <div className={styles.media}>{prevThumbnail}</div>
            <div className={styles.postBody}>
                <section className={styles.scoreAndComments}>
                    <div className={styles.scoreAndArrows}>
                        <ArrowUp />
                        <h3>{kNumberFormatter(post.data.score)}</h3>
                        <ArrowDown />
                    </div>
                    <div className={styles.commentsIconAndNum}>
                        <Comments />
                        <h3>{kNumberFormatter(post.data.num_comments)}</h3>
                    </div>
                    
                </section>
                <section>
                    <h3>{post.data.author}</h3>
                </section>
            </div>
        </div>
    );
};

export { Post };