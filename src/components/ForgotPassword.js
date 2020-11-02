import React, { useRef, useState } from 'react'
import { Card, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'


const buttonVariants = {
    hover:{
        scale:1.06,
        transition: {
            duration:0.3,
        },
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow:"0px 0px 8px rgb(255,255,255)",
    }
}

const containerVariants = {
    hidden: {
        x: '100vw',
        opacity: 0
    },
    visible: {
        opacity:1,
        x:0,
        transition:{
            type:"spring",
            delay: 0.5
        }
    },
    exit:{
        x: '-100vh',
        transition:{
            ease: 'easeInOut'
        }
    }
}

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
            <motion.Card
                variants={containerVariants}
                initial = "hidden"
                animate = "visible"
                exit="exit"
            >
                <Card.Body>
                    <h2 className= "text-center mb-4" style={{color: "#4e4e4e"}}>Password Reset</h2>
    
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant= "success">{message}</Alert> }
                    
                    <Form onSubmit = {handleSubmit} style={{maxWidth: "450px"}}>
                        <Form.Group id="email"> 
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
    
                        <motion.button disabled={loading} className="w-100" type="submit"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.9, x: "-2px", y: "4px" }}
                        >
                            Reset Password
                        </motion.button>
                    </Form>
                    <div className = "w-100 text-center mt-2">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </motion.Card>
            <div className = "w-100 text-center mt-2">
                Create New Account ? <Link to="/signup" style={{color: "#444"}}>Sign Up</Link>
            </div>   
        </>
    )
}
