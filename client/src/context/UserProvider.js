import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

export default function UserProvider(props){
    // initial state is running localStorage.getItem() that checks local storage first, so they stay logged in if they already had logged in 
    const initState = { 
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        issues: [],
        errMsg: ''
    }

    const [ userState, setUserState ] = useState(initState)

    function signup(credentials){
        axios.post("/auth/signup", credentials)
         .then(res => {
             const { user, token } = res.data
             // saving signup to local storage
             localStorage.setItem("token", token)
             localStorage.setItem("user", JSON.stringify(user))
             // updating user state to signup credentials
             setUserState(prevUserState => ({
                ...prevUserState, 
                user, 
                token
             }))
         })
         .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const login = credentials => {
        axios.post("/auth/login", credentials)
         .then(res => {
            const { user, token } = res.data
            // saving login to local storage
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            // getUserIssues()
            // updating user state to login credentials
            setUserState(prevUserState => ({
               ...prevUserState, 
               user, 
               token
            }))
         })
         .catch(err => handleAuthErr(err.response.data.errMsg))
    }
    
    const handleAuthErr = errMsg => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    const resetAuthErr = () => {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    const logout = () => {
        // if the token and user are removed from local storage and state, the user can no longer be logged in, forcing a 'logout'
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            issues: []
        })
    }

    return(
        <div>
            <UserContext.Provider
                value={{
                    ...userState,
                    signup,
                    login,
                    logout,
                    resetAuthErr,
                }}
            >
                { props.children }
            </UserContext.Provider>
        </div>
    )
}
   