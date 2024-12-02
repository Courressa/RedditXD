import React from "react";
import styles from "./FetchedComments.module.css";

function FetchedComments({comments}) {
    console.log("comments", comments)
    return (
        <div>
            {comments ? (comments.map(comment => (
                <p
                    key={comment.id}
                    className={styles.headComment}
                >
                    {comment ? comment.body : ""}
                </p>
            ))) : ""}
            
            
        </div>
    )

}

export { FetchedComments };