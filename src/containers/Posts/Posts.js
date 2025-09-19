import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPost, loadPopular, loadingPopular, loadSelectedTopicPost , errorFound, loadUserSearch, loadComments } from "./postsSlice";
import { Post } from "../../features/Post/Post";
import { LoadingIcon } from "../../features/LoadingIcon/LoadingIcon";
import { selectTopics, selectMainTopicsClick } from "../Topics/topicsSlice";
import { selectUserSearch, selectUserSearchClick } from "../Banner/bannerSlice";
import styles from "./Posts.module.css";

function Posts() {
    const postData = useSelector(selectPost);
    const postLoading = useSelector(loadingPopular);
    const postError = useSelector(errorFound);
    const selectedTopics = useSelector(selectTopics);
    const sendUserSearch = useSelector(selectUserSearch);
    const userSearchClickPing = useSelector(selectUserSearchClick);
    const mainTopicClickPing = useSelector(selectMainTopicsClick);
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Only dispatch if no error, not loading, and no data
        if (!postError && !postLoading && (!postData || postData.length === 0)) {
            if (sendUserSearch && sendUserSearch.trim() !== '') {
                dispatch(loadUserSearch(sendUserSearch));
            } else if (selectedTopics) {
                dispatch(loadSelectedTopicPost(selectedTopics));
            } else {
                dispatch(loadPopular());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, postError, postLoading, sendUserSearch, selectedTopics, userSearchClickPing, mainTopicClickPing]);

    const collectedPostIdAndSubreddit = (postSubreddit, postId) => {
        dispatch(loadComments({ subreddit: postSubreddit, postId }));
    };

    //Check if loading, then if there is error, no postdata or postData is not an array/undefined
    if (postLoading) {
        return (
            <div className={styles.loadingOrError}>
                <LoadingIcon />
            </div>
        )
    } else if (postError || !postData || !Array.isArray(postData)) {
        return (
            <div className={styles.loadingOrError}>
                <h2>
                    Oops! We ran into an issue with loading this data.
                </h2>
                <br/>
                <h2>Please refresh the page or try again later.</h2>
            </div>
        )
    }

    return (
        <div data-testid="posts" className={styles.posts}>
            {postData.map((postArr) => (
                <Post 
                    key={postArr.data.id}
                    post={postArr}
                    collectPostIdAndSubreddit={collectedPostIdAndSubreddit}
                />
            ))}
        </div>
    );
};

export { Posts };