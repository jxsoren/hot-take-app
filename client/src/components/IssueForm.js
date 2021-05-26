import React, { useContext, useState } from 'react'
import { ApplicationContext } from '../context/ApplicationProvider.js'
import '../styles/IssueForm.css'

const IssueForm = (props) => {
    const { editTog , title, description, id, setEditTog } = props
    const { addIssue, editIssue } = useContext(ApplicationContext)

    const initInputs = {
        title: title || '',
        description: description || '' 
    }
    const [ inputs, setInputs ] = useState(initInputs)

    const handleChange = e => {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    } 

    const handleSubmit = e => {
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)

        console.log(inputs)
    }

    const handleEditSubmit = e => {
        e.preventDefault()
        editIssue(inputs, id)
        setInputs(initInputs)
        setEditTog(prevTog => !prevTog)
    }

    return(
        <div className="issue-form">
            { !editTog ?
                <form onSubmit={handleSubmit}>
                    <label for="title">Take Title*</label>

                    <input 
                        className="post-input"
                        type='text'
                        name='title'
                        value={title}
                        onChange={handleChange}
                        placeholder="title"
                    />

                    <label for="description">Take Description*</label>

                    <input 
                        className="post-input"
                        type='text'
                        name='description'
                        value={description}
                        onChange={handleChange}
                        placeholder="description"
                    />  

                    <button>Submit Your Take</button>
                </form>

                : 
                // edit form
                <form 
                    className="edit-form-container"
                    onSubmit={handleEditSubmit}
                >
                    <label for="title">Take Title*</label>

                    <input 
                        className="edit-input"
                        type='text'
                        name='title'
                        // value={title}
                        onChange={handleChange}
                        placeholder="title"
                    />
 
                    <label for="description">Take Description*</label>

                    <input
                        className="edit-input" 
                        type='text'
                        name='description'
                        // value={description}
                        onChange={handleChange}
                        placeholder="description"
                    />  

                    <button
                        className="edit-button" 
                    >Submit Edit</button>

                    <button
                        className="close-button"
                        onClick={() => setEditTog(prevTog => !prevTog)}
                    >Close</button>
                </form>
            }
        </div>
    )
}


export default IssueForm