import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPasaword() {

    const emailRef = useRef();

    const { resetPassword } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();

        try{
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check Your Inbox For Further Instuctions')
        } catch {
            setError('Failed to Reset Password')
        }

        setLoading(false)
    }

    return (
        <>  
            <Card>
                <Card.Body>
                    <h2 className= "text-center mb-4">Password Reset</h2>
    
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant= "success">{message}</Alert> }
                    
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id="email"> 
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
    
                        <Button disabled={loading} className="w-100" type="submit" color=" #ff4a4a">
                            Reset Password
                        </Button>
                    </Form>
                    <div className = "w-100 text-center mt-2">
                        <Link to="/login">Login</Link>
                    </div>

                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Create New Account ? <Link to="/signup">Sign Up</Link>
            </div>   
        </>
    )
}
