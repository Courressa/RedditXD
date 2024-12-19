import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./FetchedComments.module.css";

function RepliesToComments({replies}) {
    console.log("replies", replies);
    return (
        <div className={styles.RepliesList}>
            {replies && Array.isArray(replies) ? (
                replies.map(reply => {
                    const body = reply.data.body || "";
                    const imageUrl = body.includes("\n\nhttps") ? body.split("\n\n")[1] : null;
                    
                    const markdownContent = imageUrl ? `${body.split("\n\n")[0]}\n\n![Image](${imageUrl})` : body.split("\n\n")[0];
                    console.log("reply for name", reply.author);
                    return (
                        <div
                            key={reply.data.id}
                            className={styles.CommentReplies}
                        >
                            <h3>{reply.data.author}</h3>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                
                                
                            >
                                {markdownContent}
                            </ReactMarkdown>
                        </div>
                        
                    );
                })
            ) : (
                <p>Loading Replies</p>
            )}
        </div>
    )

}

export { RepliesToComments };