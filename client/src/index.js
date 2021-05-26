import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import  UserProvider from './context/UserProvider.js'
import ApplicationProvider from './context/ApplicationProvider.js'
import './styles/styles.css'

const root = document.getElementById('root')
ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <ApplicationProvider>
                <App />
            </ApplicationProvider>
        </UserProvider>
    </BrowserRouter>,
    root
)

