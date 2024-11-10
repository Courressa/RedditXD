import React, { useRef, useEffect } from "react";
import styles from "./Post.module.css"
import Hls from 'hls.js';

function Post({post}) {
    let prevThumbnail;
    const videoRef = useRef(null);
    useEffect(() => {
        //plays video preview
        if (post.data.media) {
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

        
    }, [])
    //shows image
    if (post.data.post_hint === "image" ) {
        const fetchedImage = post.data.url;
        prevThumbnail = <img src={fetchedImage}/>;
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
    } else if (post.data.thumbnail === "self") {
        prevThumbnail = <p>{post.data.selftext}</ p>;
    } else if (post.data.url.includes("reddit.com/gallery")) {
        prevThumbnail = <img src={post.data.thumbnail}/>;
    } else {
        prevThumbnail = <a href={post.data.url}>{post.data.url}</a>;
    }
    
    return (
        <div className={styles.post}>
            <h2>{post.data.title}</h2>
            <div className={styles.media}>{prevThumbnail}</div>
        </div>
    );
};

export { Post };