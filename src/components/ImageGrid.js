import React from 'react'
import useFirestore from '../hooks/useFirestore'
import { motion } from 'framer-motion'
import { projectFirestore } from '../firebase/config'

const ImageGrid = ({ setSelectedImage }) => {

    const { docs } = useFirestore('images');

   const deleteItem = (id,e) => {
       if(e.target.className === 'closes'){
        setSelectedImage(null);
            projectFirestore
            .collection('images')
            .doc(id)
            .delete();
       }
   }

    const handleClick = (docUrl,e) => {
        if(!e.target.classList.contains('closes')) {
            setSelectedImage(docUrl);
        }
    };

    return(
        <div className = "img-grid">
            { docs && docs.map(doc => (
                <motion.div 
                    whileHover = {{ opacity: 1}}
                    layout
                    className = "img-wrap" 
                    key={doc.id} 
                    onClick = {(e) => handleClick(doc.url,e)}
                >
                    <span  className ="closes" title="Delete"
                        onClick = {(e) => deleteItem(doc.id,e)}
                    >&times;</span>
                    <span className="likes" title="Like"
                    
                    >
    
                    </span>

                    <motion.img src = {doc.url} alt = "uploaded pic"
                        initial = {{opacity: 0}}
                        animate = {{opacity: 1}}
                        transition = {{delay: 1}}
                    />
                </motion.div>
            ))}
        </div>
    );
}


export default ImageGrid;
