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
                    const gifUrl = body.includes('![gif]') ? body.match(/!\[gif\]\(([^)]+)\)/) : null;
                    console.log("gif replies", gifUrl);
                    const markdownContent = imageUrl ? `${body.split("\n\n")[0]}\n\n![Image](${imageUrl})` : body.split("\n\n")[0];
                    
                    
                    const markdownWithGif = gifUrl ? `${body}\n\n![GIF](${gifUrl})` : body;
                    return (
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            key={reply.data.id}
                            className={styles.CommentReplies}
                        >
                            {markdownContent}
                        </ReactMarkdown>
                    );
                })
            ) : (
                <p>Loading Replies</p>
            )}
        </div>
    )

}

export { RepliesToComments };