import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
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


export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to Login')
        }

        setLoading(false)
    }

    return (
        <>  
            <div className="heading">
                <h1>Fakegram</h1>
            </div>
            <motion.Card
                variants={containerVariants}
                initial= "hidden"
                animate= "visible"
                exit="exit"
            >
                <Card.Body>
                    <h2 className= "text-center mb-4" style={{color: "#4e4e4e"}}>Log In</h2>
    
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id="email"> 
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password"> 
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <motion.button disabled={loading} className="w-100 mt-2" type="submit"
                            variants={buttonVariants}
                            whileHover="hover"
                        >
                            Log In
                        </motion.button>
                    </Form>
                    <div className = "w-100 text-center mt-2">
                    <Link to="/forgot-password">
                        <motion.button 
                            variants = {buttonVariants}
                            whileHover = "hover"
                        >
                            Forgot Password
                        </motion.button>
                    </Link>
                    </div>

                </Card.Body>
            </motion.Card>
            <div className = "w-100 text-center mt-2">
                Create New Account ? 
                <Link to="/signup">
                    <motion.button 
                        variants = {buttonVariants}
                        whileHover = "hover"
                    >
                        Signup
                    </motion.button>
                </Link>
            </div>   
        </>
    )
}
