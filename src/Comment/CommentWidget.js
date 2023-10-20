import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";
import "./Comment.css";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Comment.css";

function CommentWidget({ commentsUrl, currentUserId }) {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text, parentId) => {
    if (text.length > 200) {
      alert('Comment should not exceed 200 characters');
      return;
    }

    createCommentApi(text, parentId).then((comment) => {
      const updatedComments = [comment, ...backendComments];
      setBackendComments(updatedComments);

      // Save the updated comments to local storage
      localStorage.setItem('comments', JSON.stringify(updatedComments));

      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);

      // Save the updated comments to local storage
      localStorage.setItem('comments', JSON.stringify(updatedBackendComments));

      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove the comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        toast.info('Comment  deleted Successfuly !', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000
        });
        setBackendComments(updatedBackendComments);

        // Save the updated comments to local storage
        localStorage.setItem('comments', JSON.stringify(updatedBackendComments));
      });
    }
  };

  const likeComment = (commentId) => {
    const updatedBackendComments = backendComments.map((backendComment) => {
      if (backendComment.id === commentId) {
        return { ...backendComment, likes: backendComment.likes + 1 };
      }
      return backendComment;
    });

    // Save the updated comments to local storage
    localStorage.setItem('comments', JSON.stringify(updatedBackendComments));

    setBackendComments(updatedBackendComments);

  };

  useEffect(() => {
    getCommentsApi().then((apiComments) => {
      const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
      const mergedComments = mergeAndDeduplicateComments(apiComments, storedComments);
      const sortedComments = mergedComments.sort((a, b) => b.likes - a.likes);
      setBackendComments(sortedComments);

    });
  }, []);


  return (
    <div className="comments">
      <CommentForm submitLabel="Post" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            likeComment={likeComment}

          />
        ))}
      </div>
    </div>
  );
}

// Helper function to merge and deduplicate comments
function mergeAndDeduplicateComments(apiComments, storedComments) {
  const mergedComments = [...apiComments];
  for (const storedComment of storedComments) {
    if (!apiComments.some((apiComment) => apiComment.id === storedComment.id)) {
      mergedComments.push(storedComment);
    }
  }
  return mergedComments;
}

export default CommentWidget;
