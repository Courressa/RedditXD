import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RepliesToComments } from "./RepliesToComments";
import styles from "./FetchedComments.module.css";

function FetchedComments({comments}) {
    console.log("comments", comments)
    /*let commentList;
    if (comments) {
        if (comments.body.includes("\n\nhttps")) {
            commentList = `${comments.body}\n\n![Image](${comments.body.split('\n\n')[1]})`;
        } else {
            commentList = comments.body;
        }
    }*/
    const [commentsSelected, setCommentsSelected] = useState(null);
    const handleReplyClick = (comment) => {
        setCommentsSelected(comment);
    }

    return (
        <div className={styles.commentsList}>
            {comments && Array.isArray(comments) ? (
                comments.map(comment => {
                    const body = comment.body || "";
                    const imageUrl = body.includes("\n\nhttps") ? body.split("\n\n")[1] : null;
                    const markdownContent = imageUrl ? `${body.split("\n\n")[0]}\n\n![Image](${imageUrl})` : body.split("\n\n")[0];
                    const replies = comment.replies;


                    return (
                        <div key={comment.id}>
                            <div className={styles.headComment}>
                                <h3>{comment.author}</h3>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    
                                    
                                >
                                    {markdownContent}
                                </ReactMarkdown>
                                { replies ? <p onClick={ () => handleReplyClick(comment)}>
                                    arrow
                                </p> : null}
                            </div>
                            
                            {replies ? (
                                <div >
                                    
                                    {(commentsSelected === comment) && (
                                        <RepliesToComments
                                            replies={comment.replies.data.children}
                                        />
                                    )}
                                </div>) : null
                            }
                        </div>
                    );
                })
            ) : (
                <p>No comments available.</p>
            )}
        </div>
    )

}

export { FetchedComments };