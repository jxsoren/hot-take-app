import React from 'react'
import '../styles/Vote.css'

export const Vote = (props) => {
    const { toggleUpvote, toggleDownvote } = props
    return (
        <div className='vote-parent'>
            <button className="upvote"
                onClick={toggleUpvote}
            >Agree!</button>

            <button className="downvote"
                onClick={toggleDownvote}
            >Disagree!</button>
        </div>
    )
}