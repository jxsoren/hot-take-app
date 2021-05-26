import React from 'react'
import '../styles/CommentForm.css'


const CommentForm = (props) => {
    const { value, handleChange, handleSubmit, name } = props

    return(
        <div className="comment-form">
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder="Comment Here!"
                />  
                <button className="post-comment">Post Comment</button>
            </form>
        </div>
    )
}


export default CommentForm