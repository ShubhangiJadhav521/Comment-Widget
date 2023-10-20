import { useState } from "react";
import Avatar from "./Image/Avatar.png";
import "./Comment.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fade from 'react-reveal/Fade';

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
}) => {
    const [text, setText] = useState(initialText);
    const MAX_COMMENT_LENGTH = 200;

    const isTextareaDisabled = text.length === 0;
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        toast.success('Comment Added Successfuly !', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000
        });
        setText("");
    };
    return (
        <Fade top>
        <form onSubmit={onSubmit}>
            <div className="form">
                <img src={Avatar} alt="Profile" height={40} width={60} />
                <textarea
                    rows={1}
                    className="comment-form-textarea"
                    value={text}
                    onChange={(e) => {
                        // Limit the comment text to 200 characters
                        if (e.target.value.length <= MAX_COMMENT_LENGTH) {
                            setText(e.target.value);
                        }
                    }}
                    placeholder="Join the discussion..."
                />
                <button className="comment-form-button" disabled={isTextareaDisabled}>
                    {submitLabel}
                </button>
                {hasCancelButton && (
                    <button
                        type="button"
                        className="comment-form-button comment-form-cancel-button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}

               
            </div>
        </form>
        <ToastContainer />
        </Fade>
    );
};

export default CommentForm;
