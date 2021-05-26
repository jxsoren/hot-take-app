import React, { useContext, useEffect } from 'react'
import { ApplicationContext } from '../context/ApplicationProvider.js'
import Issue from './Issue.js'

export const Discover = () => {
    const { allIssues, publicIssues } = useContext(ApplicationContext)
    useEffect(() => {
        allIssues()
    }, [])

    return(
        <div className="discover">
            <h1>Public Takes!</h1>
            {publicIssues.publicIssues.map(issue => {
                return (
                    <Issue type="public" {...issue} key={issue._id} />
                )
            })}
        </div>
    )
}