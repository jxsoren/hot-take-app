import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Auth from './components/Auth'
import { Discover } from './components/Discover'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './context/UserProvider.js'


export const App = () => {
    const { token, logout } = useContext(UserContext)
    return(
        <div className="app">
            { token && <Navbar token={token} logout={logout} /> }

            <Switch>
                <Route 
                    exact path='/'
                    // if a token is presented, the user gets redirected to the profile page when and if they are logged in. Redirect comes from the 'react-router-dom' dependency.
                    render={() => token ? <Redirect to={"/profile"}/> : <Auth />}
                />

                <ProtectedRoute 
                    exact path='/profile'
                    component={Profile}
                    redirectTo="/"
                    token={token}   
                />

                <ProtectedRoute 
                    exact path='/discover'
                    component={Discover}
                    redirectTo="/"
                    token={token}   
                />
            </Switch>
        </div>
    )
}