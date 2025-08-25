import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Post.module.css";
import Hls from 'hls.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import { ArrowUp } from "../svg_icons/ArrowUp";
import { ArrowDown } from "../svg_icons/ArrowDown";
import { Comments } from "../svg_icons/Comments";
import { FetchedComments } from "../FetchedComments/FetchedComments";
import { selectComments } from "../../containers/Posts/postsSlice";
import { selectModeState } from "../ModeSetter/modeSetterSlice";


function Post({post, collectPostIdAndSubreddit}) {
    const commentsFetched = useSelector(state => selectComments(state, post.data.id));
    const darkModeState = useSelector(selectModeState);

    let postData;
    const videoRef = useRef(null);
    useEffect(() => {
        let hls;
        //plays video preview
        if (post.data.post_hint === "hosted:video") {
            const fetchedVideo = post.data.media.reddit_video.hls_url;
            
            if (Hls.isSupported()) {
                hls = new Hls();
                hls.loadSource(fetchedVideo);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play().catch(error => {
                    console.error('Error with playing video:', error);
                    });
                });
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                // For Safari
                videoRef.current.src = fetchedVideo;
                videoRef.current.addEventListener('loadedmetadata', () => {
                    videoRef.current.play().catch(error => {
                        console.error('Error with playing video:', error);
                        });
                });
            };
        };
        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [post.data.post_hint, post.data.media])

    /////SET UP REDDIT GALLERY AND SELFTEXT ///////
    try {
        //shows image
        if (post.data.post_hint === "image" ) {
            const fetchedImage = post.data.url;
            postData = <img src={fetchedImage} />;
        } else if (post.data.post_hint === "hosted:video") {
            postData = <video 
                ref={videoRef} 
                controls 
                autoPlay
                muted
                loop
            >
                Your browser does not support the video tag.
            </video>;
        } else if (post.data.post_hint === "rich:video") {
            postData = (
                <div className={styles.richVideo}>
                    <img src={post.data.media.oembed.thumbnail_url}/>
                    <a href={post.data.url} target="_blank">{post.data.url}</a>
                </div>
            );
        } else if ((post.data.thumbnail === "self") && (typeof post.data.selftext === "string")) {
            console.log("markdown stuff", post.data);
            postData = (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.data.selftext}
                </ReactMarkdown>
            );
        } else if (post.data.url.includes("reddit.com/gallery")) {
            postData = (
                <div className={styles.gallery}>
                    {post.data.selftext ? <p>{post.data.selftext}</p> : null}
                    <br/>
                    <img src={post.data.thumbnail}/>
                </div>
            );
        } else {
            postData = <a href={post.data.url} target="_blank">{post.data.url}</a>;
        };
    } catch (error) {
        console.log(error);
    };

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
        };

        return output;
    };

    const [commentsDisplay, setCommentsDisplay] = useState(false);
    const handleCommentDropdownClick = () => {
        if (!commentsDisplay) {
            collectPostIdAndSubreddit(post.data.subreddit_name_prefixed, post.data.id);
        };
        setCommentsDisplay(!commentsDisplay);
    };

    const [arrowUpState, setArrowUpState] = useState(false);
    const [arrowDownState, setArrowDownState] = useState(false);
    const [redditScore, setRedditScore] = useState(post.data.score);
    const handleArrowClick = (event) => {
        if ((event.target.id === "ArrowUp" || event.target.id === "ArrowUpPath") && (arrowUpState === false)) {
            setArrowUpState(true);
            setArrowDownState(false);
            setRedditScore(post.data.score + 1);
        } else if ((event.target.id === "ArrowDown" || event.target.id === "ArrowDownPath" ) && (arrowDownState === false)) {
            setArrowDownState(true);
            setArrowUpState(false);
            setRedditScore(post.data.score - 1);
        } else if ((event.target.id === "ArrowUp" || event.target.id === "ArrowUpPath") && (arrowUpState === true)) {
            setArrowUpState(false);
            setRedditScore(post.data.score);
        } else if ((event.target.id === "ArrowDown" || event.target.id === "ArrowDownPath") && (arrowDownState === true)) {
            setArrowDownState(false);
            setRedditScore(post.data.score);
        };
    };

    return (
        <div className={styles.postInfo}>
            <div className={darkModeState ? styles.postDarkMode : styles.post}>
                <section className={styles.postHeader}>
                    <h2>{post.data.title}</h2>
                    <h4>{dateFormatter()}</h4>
                </section>
                
                <div className={darkModeState ? styles.mediaDarkMode : styles.media}>
                    {postData}
                </div>
                <div className={styles.postBody}>
                    <section className={styles.scoreAndComments}>
                        <div className={darkModeState ? styles.scoreAndArrowsDarkMode : styles.scoreAndArrows}>
                            <div onClick={handleArrowClick}>
                                <ArrowUp
                                    arrowUpState={arrowUpState}
                                    darkModeSwitch={darkModeState}
                                />
                            </div>
                            
                            <h3>{kNumberFormatter(redditScore)}</h3>
                            <div onClick={handleArrowClick}>
                                <ArrowDown
                                    arrowDownState={arrowDownState}
                                    darkModeSwitch={darkModeState}
                                />
                            </div>
                            
                        </div>
                        <div 
                            className={darkModeState ? styles.commentsIconAndNumDarkMode : styles.commentsIconAndNum}
                            onClick={handleCommentDropdownClick}
                            id={post.data.id}
                        >
                            <Comments
                                darkModeSwitch={darkModeState}
                            />
                            <h3>{kNumberFormatter(post.data.num_comments)}</h3>
                        </div>
                        
                    </section>
                    <section className={styles.authorName}>
                        <h3>{post.data.author}</h3>
                    </section>
                </div>
            </div>
            <div>
            {commentsDisplay && (
                <section>
                    <div className={darkModeState ? styles.fetchedCommentsBkgdDropDarkMode : styles.fetchedCommentsBkgdDrop} ></div>
                    <FetchedComments
                        darkModeSwitch={darkModeState}
                        comments={commentsFetched}
                    />
                    
                </section>
            )}
            </div>
        </div>
    );
};

export { Post };