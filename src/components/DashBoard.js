import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import Title from './Title'
import UploadForm from './UploadForm'
import ImageGrid from './ImageGrid'
import Modal from './Modal'
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

export default function DashBoard() {
    const [error, setError] = useState("")
    const { logout } = useAuth()
    const history = useHistory();
    const [selectedImage, setSelectedImage] = useState(null);

    async function handleLogout(){
        setError('')
        try{
            await logout()
            history.push("/login")
        }catch{
            setError('Failed To Log Out')
        }
    }

    return(
        <>
            <div className = "App"
                variants={containerVariants}
                initial= "hidden"
                animate= "visible" 
            >
                {error && <Alert variant="danger">{error}</Alert>}
                <Title />
                <UploadForm />
                <ImageGrid setSelectedImage ={setSelectedImage}/>
                { selectedImage && <Modal selectedImage = {selectedImage} setSelectedImage={setSelectedImage}/>}
                <div className = "w-100 text-center mt-2 next">
                    <Link to="/update">
                        <motion.button 
                            variants = {buttonVariants}
                            whileHover = "hover"
                        >
                            Update Profile
                        </motion.button>
                    </Link>
                </div>
                <div className = "w-100 text-center mt-2 next">
                    <motion.button 
                        onClick={handleLogout} 
                        variants= {buttonVariants}
                        whileHover= "hover"
                    >
                        Log Out
                    </motion.button>
                </div>
            </div>
            

        </>
    )

}
      
