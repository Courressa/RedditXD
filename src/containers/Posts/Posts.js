import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPopular, loadPopular, loadingPopular } from "./postsSlice";
import { Post } from "../../features/Post/Post"
import styles from "./Posts.module.css";



function Posts() {
    const popularData = useSelector(selectPopular);
    const loading = useSelector(loadingPopular);
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(loadPopular());
    }, []);

    if (loading) {
        return <h2>Loading...</h2>
    }
    console.log(popularData);
    return (
        <div className={styles.posts}>
            {popularData.map((postArr, index) => (
                <Post 
                    key={index}
                    post={postArr}
                />
            ))}
        </div>
    );
};

export { Posts };