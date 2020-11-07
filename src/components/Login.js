import React, { useRef, useState } from 'react'
import { Card, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import { AnimatedText } from '../AnimatedText/AnimatedText'
import ParticlesBg from 'particles-bg'

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
        opacity: 0,

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
            <ParticlesBg color="#ffa62b" type="cobweb" bg={true}/>
            <div className="heading" style={{opacity:"0.7"}}>
                <AnimatedText
                    textColor = "#ff4a4a"
                    overlayColor = "#ffa62b"
                >
                    FakeGram
                </AnimatedText>
            </div>
            <motion.Card
                variants={containerVariants}
                initial= "hidden"
                animate= "visible"
                exit="exit"
            >
                <Card.Body style={{margin:"auto",borderRadius: "15px", boxShadow:"5px 3px 8px rgba(0, 0,0, 0.5)",width:"550px" }}>
                    <h2 className= "text-center mb-4" style={{color: "#4e4e4e"}} >Log In</h2>
    
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit} style={{maxWidth: "450px"}}>
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
                            whileTap={{ scale: 0.9, x: "-2px", y: "4px" }}
                        >
                            Log In
                        </motion.button>
                    </Form>
                    <div className = "w-100 text-center mt-2">
                    <Link to="/forgot-password">
                        <motion.button 
                            variants = {buttonVariants}
                            whileHover = "hover"
                            whileTap={{ scale: 0.9, x: "-2px", y: "4px" }}
                        >
                            Forgot Password
                        </motion.button>
                    </Link>
                    </div>

                </Card.Body>
            </motion.Card>
            <div className = "w-100 text-center mt-2">
                Create New Account ? 
                <Link to="/signup" style={{color: "#444"}}>Sign Up</Link>
            </div>   
        </>
    )
}
