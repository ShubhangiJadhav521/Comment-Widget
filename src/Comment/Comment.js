import CommentForm from "./CommentForm";
import "./Comment.css";
import { format, isToday, isYesterday, differenceInMinutes, differenceInDays } from 'date-fns';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useState } from "react";
import Fade from 'react-reveal/Fade';
import { Paper } from "@mui/material";
import Reveal from 'react-reveal/Reveal';

const Comment = ({
    comment,
    replies,
    setActiveComment,
    activeComment,
    updateComment,
    deleteComment,
    addComment,
    parentId = null,
    currentUserId,
    likeComment,

}) => {
    const [Likebtn, setLikebtn] = useState(false);
    const [displaybtn, setDisplaybtn] = useState(false)
    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canDelete =
        currentUserId === comment.userId && replies.length === 0;
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId;
    const replyId = parentId ? parentId : comment.id;
    // const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const createdAt = new Date(comment.createdAt);
    // Function to format the timestamp
    const formatTimestamp = (timestamp) => {
        const minutesAgo = differenceInMinutes(new Date(), timestamp);

        if (minutesAgo < 60) {
            return "an hour ago";
        } else if (isToday(timestamp)) {

            return `${Math.floor(minutesAgo / 60)} hours ago`;
        } else if (isYesterday(timestamp)) {

            return 'Yesterday';
        } else {

            return format(timestamp, 'dd/MM/yyyy');
        }
    };


    return (
        <div key={comment.id} className={`comment comment-entry`}>

            <div className="comment-image-container">
                <img src={comment.imageUrl} alt="Profile" width={40} height={30} />
            </div>
            <div className="comment-right-part">
                <Paper elevation={0} style={{ padding: '10px' }}>
                    <Reveal effect="fadeInUp">
                        <div className="comment-content">
                            <div className="comment-author">{comment.username}</div>
                            <div className="time">{formatTimestamp(createdAt)}</div>
                        </div>
                    </Reveal>
                    {!isEditing && <div className="comment-text">{comment.body}</div>}

                    <div className="comment-icon" >
                        <div className="comment-like" >
                            <span>{comment.likes} </span>
                            <KeyboardArrowUpOutlinedIcon className="icon" style={{ fontSize: '12px' }}
                                onClick={() => Likebtn ? setLikebtn(false) : setLikebtn(true)} />

                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <KeyboardArrowDownOutlinedIcon className="icon" style={{ fontSize: '12px' }}
                                onClick={() => displaybtn ? setDisplaybtn(false) : setDisplaybtn(true)} />
                            <button className="btnreply"
                                onClick={() =>
                                    setActiveComment({ id: comment.id, type: "replying" })
                                } >Reply</button>
                        </div>
                    </div>

                    {Likebtn && (
                        <button className="likebtn" onClick={() => { likeComment(comment.id); setLikebtn(false) }} >
                            like👍
                        </button>
                    )}


                    {isEditing && (
                        <CommentForm
                            submitLabel="Update"
                            hasCancelButton
                            initialText={comment.body}
                            handleSubmit={(text) => updateComment(text, comment.id)}
                            handleCancel={() => {
                                setActiveComment(null);
                            }}
                        />
                    )}

                    {displaybtn && (

                        <div className="comment-actions">
                            <div
                                className="comment-action"
                                onClick={() => {
                                    setActiveComment({ id: comment.id, type: "editing" });
                                    setDisplaybtn(false);
                                }
                                }
                            >
                                Edit
                            </div>


                            <div
                                className="comment-action"
                                onClick={() => {
                                    deleteComment(comment.id);
                                    setDisplaybtn(false)
                                }
                                }
                            >
                                Delete
                            </div>
                        </div>

                    )}

                    {isReplying && (
                        <CommentForm
                            submitLabel="Reply"
                            handleSubmit={(text) => addComment(text, replyId)}
                        />
                    )}

                    <Fade left>
                        {replies.length > 0 && (
                            <div className="replies">
                                {replies.map((reply) => (
                                    <Comment
                                        comment={reply}
                                        key={reply.id}
                                        setActiveComment={setActiveComment}
                                        activeComment={activeComment}
                                        updateComment={updateComment}
                                        deleteComment={deleteComment}
                                        addComment={addComment}
                                        parentId={comment.id}
                                        replies={[]}
                                        currentUserId={currentUserId}
                                        likeComment={likeComment}
                                    />
                                ))}

                            </div>
                        )}
                    </Fade>
                </Paper>
            </div>
        </div>
    );
};

export default Comment;
