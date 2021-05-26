import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider.js'
import { ApplicationContext } from '../context/ApplicationProvider'
import IssueForm from './IssueForm'
import IssueList from './IssueList'
import '../styles/Profile.css'

export default function Profile(){
  const { 
    user: { 
      username 
    }
  } = useContext(UserContext)

  const { 
    addIssue, 
    issues,
    creatorIssues, 
    deleteIssue,
  } = useContext(ApplicationContext)
  
  useEffect(() => {
    creatorIssues()
  }, [])
  console.log(issues)

  return (
    <div className="profile">
      <h1 className="welcome"> WELCOME @
        <span>
          {username}
        </span>
      !
      </h1>

      <h1>Post A New Take!</h1>
      <hr />

      <IssueForm  getUserIssues={creatorIssues} addIssue={addIssue} />

      <h1 className="my-issues">My Takes</h1>
      <hr />

      <IssueList username={username} type='profile' issues={issues} deleteIssue={deleteIssue} />
    </div>
  )
}