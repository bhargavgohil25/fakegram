import React, { useRef, useState } from 'react'
import { Card, Form, Alert } from 'react-bootstrap'
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



export default function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const { signin } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try{
            setError("")
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to Create An Account')
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
                    <h2 className= "text-center mb-4" style={{color: "#4e4e4e"}}>Sign Up</h2>
    
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
                        <Form.Group id="password-confirm"> 
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <motion.button disabled={loading} className="w-100" type="submit"
                            variants={buttonVariants}
                            whileHover = "hover"
                        >
                            Sign Up
                        </motion.button>
                    </Form>
                </Card.Body>
            </motion.Card>
            <div className = "w-100 text-center mt-2">
                Already Have An Account ? <Link to="/login">Log In</Link>
            </div>   
        </>
    )
}
