import React from 'react'
import Comment from './Comment.js'
import '../styles/CommentList.css'

const CommentList = (props) => {
    const { comments } = props
    return(
        <div className="comment-list">
            <h3>Comments:</h3>
            { comments.comments.length >= 1 ? 

                comments.comments.map(comment => {
                    return (
                        <Comment 
                            userId={comment.user}
                            comment={comment.comment}
                            key={comment._id}
                        />
                    )
                })
                :
                
                <>
                    <p className="no-comments">
                       No Comments...
                    </p>
                </>
            }
            { 
                
            }
        </div>
    )
}


export default CommentList