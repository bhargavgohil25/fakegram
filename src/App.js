import React from 'react'
import Title from './components/Title'
import UploadForm from './components/UploadForm'
import ImageGrid from './components/ImageGrid'

const App = () => {
    return(
        <div className = "App">
            <Title />
            <UploadForm />
            <ImageGrid />
        </div>
    );
}

export default App;