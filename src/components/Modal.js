import React from 'react'
import { motion } from 'framer-motion'

const Modal = ({ selectedImage, setSelectedImage }) => {

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelectedImage(null);
        }
    }

    return(
        <motion.div className = "backdrop" onClick = {handleClick}
            initial =  {{ opacity: 0 }}
            animate = {{ opacity : 1}}
            style={{zIndex: 10}}
        >
            <motion.img src={selectedImage} alt= "enlarged Pic" 
                initial={{y:"100vh"}}
                animate={{y: 0}}
                transition={{ ease: "easeInOut", duration: 0.7 }}
                style={{borderRadius: "15px"}}
            />
        </motion.div>
    );
}

export default Modal;