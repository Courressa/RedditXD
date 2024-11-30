import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPost, loadPopular, loadingPopular, loadSelectedTopicPost , errorFound, loadUserSearch } from "./postsSlice";
import { Post } from "../../features/Post/Post"
import styles from "./Posts.module.css";
import { selectTopics, selectMainTopicsClick } from "../Topics/topicsSlice";
import { selectUserSearch, selectUserSearchClick } from "../Banner/bannerSlice";


function Posts() {
    const postData = useSelector(selectPost);
    const loading = useSelector(loadingPopular);
    const error = useSelector(errorFound);
    const selectedTopics = useSelector(selectTopics);
    const dispatch = useDispatch();
    const sendUserSearch = useSelector(selectUserSearch);
    const userSearchClickPing = useSelector(selectUserSearchClick);
    const MainTopicClickPing = useSelector(selectMainTopicsClick);
    
    useEffect(() => {
        if (selectedTopics) {
            dispatch(loadSelectedTopicPost(selectedTopics));
        } else {
            dispatch(loadPopular());
        }
        
    }, [MainTopicClickPing, selectedTopics, dispatch]);

    useEffect(() => {
        if (sendUserSearch) {
            dispatch(loadUserSearch(sendUserSearch));
        } else {
            dispatch(loadPopular());
        }
        
    }, [userSearchClickPing, sendUserSearch, dispatch]);

    ////******TODO: DISABLE TOPIC SELECTION WHEN POSTS ARE LOADING*******//////

    if (loading) {
        return <h2>Loading...</h2>
    } else if (error || !postData) {
        return <h2>Oops! We ran into an issue with loading this data.</h2>
    }
    console.log("Post", postData);
    return (
        <div className={styles.posts}>
            {postData.map((postArr, index) => (
                <Post 
                    key={index}
                    post={postArr}
                />
            ))}
        </div>
    );
};

export { Posts };