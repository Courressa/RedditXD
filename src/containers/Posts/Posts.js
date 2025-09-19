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
    // Only fetch if no posts are loaded and posts are not in loading state
    if (!postData.length && !postLoading) {
      if (sendUserSearch) {
        dispatch(loadUserSearch(sendUserSearch)); //Search takes priority
      } else if (selectedTopics) {
        dispatch(loadSelectedTopicPost(selectedTopics)); //Then topic
      } else {
        dispatch(loadPopular()); //Fallback to popular
      }
    }
  }, [dispatch, postData.length, postLoading, sendUserSearch, selectedTopics, userSearchClickPing, mainTopicClickPing]);
    

    const collectedPostIdAndSubreddit = (postSubreddit, postId) => {
        dispatch(loadComments({ subreddit: postSubreddit, postId }));
    };

    if (postLoading) {
        return (
            <div className={styles.loadingOrError}>
                <LoadingIcon />
            </div>
        )
    } else if (postError || !postData) {
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