import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPopular, loadPopular } from "./postsSlice";
import { Post } from "../../features/Post/Post"
import styles from "./Posts.module.css";



function Posts() {
    const popularData = useSelector(selectPopular);
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(loadPopular());
    }, []);
    console.log("not sending for popular info", popularData);


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