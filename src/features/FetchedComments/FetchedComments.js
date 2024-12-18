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
                    let markdownContent;
                    const replies = comment.replies;

                    const gifUrl = body.includes('![gif]') ? body.match(/!\[gif\]\(([^)]+)\)/) : null;
                    let selectGif = gifUrl ? gifUrl[1] : null;
                    
                    console.log("gif overall", gifUrl);
                    if (imageUrl) {
                        markdownContent = imageUrl ? `${body.split("\n\n")[0]}\n\n![Image](${imageUrl})` : body.split("\n\n")[0];
                    } else {
                        if (gifUrl) {
                            console.log("This is that thing",comment.media_metadata.selectGif[1]);
                        }
                        
                        markdownContent = gifUrl ? `${body}\n\n![gif](${comment.media_metadata.selectGif.ext})` : body;
                    }
                    

                    return (
                        <div key={comment.id}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                
                                className={styles.headComment}
                            >
                                {markdownContent}
                            </ReactMarkdown>
                            {replies ? (
                                <div
                                    onClick={ () => handleReplyClick(comment)}
                                >
                                    <p>arrow</p>
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