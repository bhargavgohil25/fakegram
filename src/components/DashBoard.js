import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import Title from './Title'
import UploadForm from './UploadForm'
import ImageGrid from './ImageGrid'
import Modal from './Modal'
import { motion } from 'framer-motion'
import Grid from '@material-ui/core/Grid'

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
                exit="exit"
            >
                {error && <Alert variant="danger">{error}</Alert>}
                <Title />
                <UploadForm />
                <ImageGrid setSelectedImage ={setSelectedImage}/>
                { selectedImage && <Modal selectedImage = {selectedImage} setSelectedImage={setSelectedImage}/>}
                <div className = "w-100 text-center mt-2 next">
                    <Grid container>
                        <Grid items xs={6}>
                            <Link to="/update">
                                <motion.button 
                                    variants = {buttonVariants}
                                    whileHover = "hover"
                                    whileTap={{ scale: 0.9, x: "-2px", y: "4px" }}
                                >
                                    Update Profile
                                </motion.button>
                            </Link>
                        </Grid>
                        <Grid items xs={6}>
                            <motion.button 
                                onClick={handleLogout} 
                                variants= {buttonVariants}
                                whileHover= "hover"
                                whileTap={{ scale: 0.9, x: "-2px", y: "4px" }}
                            >
                                Log Out
                            </motion.button>
                        </Grid>
                    </Grid>    
                </div>
                <div className = "w-100 text-center mt-2 next">
                    
                </div>
            </div>
            

        </>
    )

}
      
