import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const ApplicationContext = React.createContext()

// creates an instance of axios that allows you to configure axios for specific reason. also maintains all of the functionalities and methods that axios comes with.
const userAxios = axios.create()

// for outgoing requests, intercept it and use the following configuration
// grabs token from local storage, then sets an Authorization key that is equal to `Bearer ${ token }` and sends it to the header
// anytime you use userAxios(), it will already come with the header's Authorization 'Bearer and token'
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function ApplicationProvider(props){
    const initPublic = {
        publicIssues: []
    }

    const [ issues, setIssues ] = useState({ issues: [] })
    const [ publicIssues, setPublicIssues ] = useState(initPublic)

    const allIssues = () => {
        userAxios.get('/api/issues')
         .then(res => {
             setPublicIssues(prev => ({
                 ...prev, 
                 publicIssues: res.data
             }))
         })
         .catch(err => console.log(err))
    }

    const creatorIssues = () => {
        userAxios.get('/api/issues/user')
         .then(res => {
             setIssues(prev => ({
                 ...prev,
                 issues: res.data
             }))
         })
         .catch(err => console.dir(err))
    }

    const addIssue = newIssue => {
        userAxios.post('/api/issues', newIssue)
         .then(res => {
            setIssues(prev => ({
               ...prev,
               issues: [ ...prev.issues, res.data ]
            }))

            setPublicIssues(prev => ({
                ...prev,
                publicIssues: [...prev.publicIssues, res.data]
            }))
         })
         // err.response.data.errMsg is the custom err msg that was created that is being pulled from response.data
         .catch(err => console.log(err))
    }

    const deleteIssue = _id => {
        console.log(_id)
        userAxios.delete(`/api/issues/${_id}`)
         .then(res => {
            //  getUserIssues()
            setIssues(prev => ({ 
                ...prev,
                issues: prev.issues.filter(issue => issue._id !== _id)
            }))
        })
        .catch(err => console.log(err))
}

    const editIssue = (updates, _id) => {
        userAxios.put(`/api/issues/${ _id }`, updates)
         .then(res => {
             setIssues(prev => ({
                 ...prev,
                 issues: prev.issues.map(issue => issue._id !== _id ? issue : res.data)
             }))
             console.log(res.data)
         })
         .catch(err => console.log(err))
    }

    const handleVote = ( voteType, issueId ) => {
        userAxios.put(`/api/issues/${voteType}/${issueId}`)
         .then(res => console.log(res))
         .catch(err => console.log(err))
    }

    //-- Comments --//

    const postComment = ( inputs, issueId ) => {
        userAxios.post(`/api/issues/${issueId}/comment`, inputs)
         .then(res => console.log(res))
         .catch(err => console.dir(err))
    }

    return(
        <div>
            <ApplicationContext.Provider
                value={{
                    issues,
                    addIssue,
                    allIssues,
                    deleteIssue,
                    editIssue,
                    userAxios,
                    postComment,
                    publicIssues,
                    creatorIssues,
                    handleVote
                }}
            >
                { props.children }
            </ApplicationContext.Provider>
        </div>
    )
}
   