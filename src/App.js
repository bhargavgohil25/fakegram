import React, { useState } from 'react'
import Title from './components/Title'
import UploadForm from './components/UploadForm'
import ImageGrid from './components/ImageGrid'
import Modal from './components/Modal'
const App = () => {

    const [selectedImage, setSelectedImage] = useState(null);  // This State is used to know which image is clicked and has to enlarged in the modal.

    return(
        <div className = "App">
            <Title />
            <UploadForm />
            <ImageGrid setSelectedImage ={setSelectedImage}/>
            { selectedImage && <Modal selectedImage = {selectedImage} setSelectedImage={setSelectedImage}/>}
        </div>
    );
}

export default App;