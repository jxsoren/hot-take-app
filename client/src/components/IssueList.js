import React from "react"
import Issue from './Issue.js'

const IssueList = props => {
    const { issues, deleteIssue } = props
    console.log(issues)
    return(
        <div className="issue-list">
            { issues.issues.map(issue => <Issue {...issue} deleteIssue={deleteIssue} key={issue._id} type='profile' />) }
        </div>
    )
}

export default IssueList