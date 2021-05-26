import React, { useContext, useState, useEffect } from "react"
import { ApplicationContext } from '../context/ApplicationProvider.js'
import '../styles/Comment.css'

const Comment = (props) => {
    const { comment, userId } = props
    const { userAxios } = useContext(ApplicationContext)
    const [commentPoster, setCommentPoster] = useState("")

    const getCommentPoster = (userId) => {
        userAxios.get(`/api/issues/comment/user/${userId}`)
         .then(res => setCommentPoster(res.data.username))
         .catch(err => console.log(err))
    }

    useEffect(() => {
        getCommentPoster(userId)
    }, [])

    return  (
        <div className="comment-container">
            <p className="comment"> 
            @
            <span className="comment-username">
                { commentPoster }
            </span>
            : { comment } </p>
        </div>
    )
}

export default Comment