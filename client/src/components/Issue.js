import React, {useContext, useState, useEffect} from 'react'
import { ApplicationContext } from '../context/ApplicationProvider.js'

import { Vote }from './Vote.js'
import IssueForm from './IssueForm.js'
import CommentForm from './CommentForm'
import CommentList from './CommentList.js' 
import '../styles/Issue.css'

const Issue = props => {
    const { title, description, _id, deleteIssue, type, user, upvotes, downvotes } = props
    const { userAxios, postComment, handleVote } = useContext(ApplicationContext)
    const [ editTog, setEditTog ] = useState(false)
    const [ voted, setVoted ] = useState(false)
    

    const initComment = {
        comment: ''
    }
    const [ commentState, setCommentState ] = useState(initComment)

    const [ comments, setComments ] = useState({ comments: []})
    const [ authorUsername, setAuthorUsername ] = useState('')

    useEffect(() => {
        getIssueUsername(user)
        getIssueComments(_id)
    }, [])


    const toggleUpvote = () => {
        if(!voted){
            handleVote("upvote", _id)
        }
        setVoted((prev)=> true)
    }

    const toggleDownvote = () => {
        if(voted){
            
        }

        if(!voted){
            handleVote("downvote", _id)
            setVoted((prev) => true)
        }
    }

    const handleCommentChange = ( e ) => {
        const { name, value } = e.target;
        setCommentState((prev) => {
            return {
                [name]: value,
            };
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        console.log('handleCommentSubmit')

        postComment(commentState, _id)
        setCommentState(initComment)
        getIssueComments(_id);
        console.log(commentState)
    };

    console.log(commentState)

    const getIssueUsername = (userID) => {
        userAxios.get(`/api/issues/user/${userID}`)
        .then(res => {
            setAuthorUsername(res.data.username)
        })
        .catch(err => console.log(err))
    }

    const getIssueComments = (issueId) => {
        userAxios.get(`/api/issues/${issueId}/comment`)
         .then(res => {
             setComments(prev => {
                return {
                    comments: res.data
                }
             })
         })
         .catch(err => console.log(err))
    }

    return(
        <div className="issue">
            { type === 'profile' ? 
                !editTog ? 
                <>
                    <h3 className="take-by">Take by: 
                        <span> </span>
                        <span className="author-username">
                            @{authorUsername}
                        </span>
                    </h3>
                    <h1>{title}</h1>
                    <h2>{description}</h2>

                    <div className="display-votes-container"> 
                        <h3 className="display-upvote">Agreed: {upvotes}</h3>
                        <h3 className="display-downvote">Disagreed: {downvotes}</h3>
                    </div>

                    <CommentList 
                        comments={comments}
                    />

                    <CommentForm 
                        handleChange={handleCommentChange}
                        handleSubmit={handleCommentSubmit}
                        value={commentState.comment}
                        name='comment'
                    />

                    <div className="issue-button-parent">
                        <button 
                            className="edit-button"
                            onClick={() => setEditTog(prevTog => !prevTog)}
                        >
                            Edit</button>
                        <button className="delete-button" onClick={() => deleteIssue(_id)}>Delete</button>
                    </div>
                </> 
                    : 
                <>
                    <div className="edit-form">
                        <IssueForm 
                            id={_id}
                            editTog={editTog}
                            title={title}
                            description={description}
                            setEditTog={setEditTog}
                        />
                    </div>
                    
                </>
            : // public issues
                <div className="public-issues">
                    <h3 className="take-by">Take by: 
                        <span> </span>
                        <span className="author-username">
                            @{authorUsername}
                        </span>
                    </h3>
                    <h1>{title}</h1>
                    <h2>{description}</h2>

                    <div className="display-votes-container"> 
                        <h3 className="display-upvote">Agreed: {upvotes}</h3>
                        <h3 className="display-downvote">Disagreed: {downvotes}</h3>
                    </div>

                    <Vote 
                        toggleUpvote={toggleUpvote}
                        toggleDownvote={toggleDownvote}
                    />

                    <div>
                        <CommentList 
                            comments={comments}
                        />
                    </div>
                </div>

            }
            </div>

    )
}

export default Issue