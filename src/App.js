import React from 'react'
import Signup from './components/SignUp'
import Login from './components/Login'
import UpdateProfile from './components/UpdateProfile'
import PrivateRoute from './components/PrivateRoute'
import DashBoard from './components/DashBoard'
import ForgotPassword from './components/ForgotPassword'

import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'


function App() {
    return(
        <AnimatePresence exitBeforeEnter>

            <Container 
            className = "d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" , fontFamily: "Comfortaa"}}
            >
                <div className = "w-100" style = {{ maxWidth:"800px" }}>
                    <Router>
                        <AuthProvider>
                            <Switch>
                                <PrivateRoute exact path="/" component={DashBoard}/>
                                <PrivateRoute  path="/update" component={UpdateProfile}/>
                                <Route path="/signup" component={Signup}/>
                                <Route path="/login" component={Login} />
                                <Route path="/forgot-password" component={ForgotPassword} />
                            
                            </Switch>
                        </AuthProvider>
                    </Router>
                </div>
            </Container>

        </AnimatePresence>
    )

}

export default App;