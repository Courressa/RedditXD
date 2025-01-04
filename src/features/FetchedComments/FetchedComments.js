import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector } from "react-redux";
import { RepliesToComments } from "./RepliesToComments";
import { PointDown } from "../svg_icons/PointDown";
import { loadingComments } from "../../containers/Posts/postsSlice";
import { errorFoundInComments } from "../../containers/Posts/postsSlice";
import { LoadingIcon } from "../LoadingIcon/LoadingIcon";
import styles from "./FetchedComments.module.css";

function FetchedComments({comments, darkModeSwitch}) {
    const commentLoading = useSelector(loadingComments);
    const commentError = useSelector(errorFoundInComments);
    
    const [commentsSelected, setCommentsSelected] = useState(null);
    const handleReplyClick = (comment) => {
        setCommentsSelected(comment);
    }

    let commentListStyle;

    if (comments && (!darkModeSwitch)) {
        commentListStyle = styles.commentsList;
    } else if (comments && (darkModeSwitch)) {
        commentListStyle = styles.commentsListDarkMode;
    } else if (!comments) {
        commentListStyle = styles.noCommentsList;
    };

    return (
        <div className={commentListStyle}>
            {commentLoading ? (
                <div className={darkModeSwitch ? styles.loadingCommentsOrErrorDarkMode : styles.loadingCommentsOrError}>
                    <LoadingIcon />
                </div>
            ) : (
                commentError ? (
                    <p className={darkModeSwitch ? styles.loadingCommentsOrErrorDarkMode : styles.loadingCommentsOrError}>
                        There was an issue with loading these comments.
                    </p>
                ) : (
                    comments && Array.isArray(comments) ? (
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
                                        { (replies && (commentsSelected !== comment)) ? 
                                            <div 
                                                onClick={ () => handleReplyClick(comment)}
                                                className={styles.commentRepliesDropIcon}
                                            >
                                                <PointDown />
                                                <p>replies</p>
                                            </div> : null
                                        }
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
                        <p className={darkModeSwitch ? styles.loadingCommentsOrErrorDarkMode : styles.loadingCommentsOrError}>
                            No comments available.
                        </p>
                    )
                )
            )}
        </div>
    )

}

export { FetchedComments };