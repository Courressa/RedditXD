import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPopular, loadPopular, loadingPopular, loadSelectedTopicPost , errorFound } from "./postsSlice";
import { Post } from "../../features/Post/Post"
import styles from "./Posts.module.css";
import { selectTopics } from "../Topics/topicsSlice";


function Posts() {
    const postData = useSelector(selectPopular);
    const loading = useSelector(loadingPopular);
    const error = useSelector(errorFound);
    const selectedTopics = useSelector(selectTopics);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!selectedTopics) {
            dispatch(loadPopular());
        } else {
            dispatch(loadSelectedTopicPost(selectedTopics));
        }
    }, [selectedTopics, dispatch]);

    ////******TODO: DISABLE TOPIC SELECTION WHEN POSTS ARE LOADING*******//////

    if (loading) {
        return <h2>Loading...</h2>
    } else if (error || !postData) {
        return <h2>Oops! We ran into an issue with loading this data.</h2>
    }
    //console.log(postData);
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