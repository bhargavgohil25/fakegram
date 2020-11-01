import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import Title from './Title'
import UploadForm from './UploadForm'
import ImageGrid from './ImageGrid'
import Modal from './Modal'


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
            <div className = "App">
                {error && <Alert variant="danger">{error}</Alert>}
                <Title />
                <UploadForm />
                <ImageGrid setSelectedImage ={setSelectedImage}/>
                { selectedImage && <Modal selectedImage = {selectedImage} setSelectedImage={setSelectedImage}/>}
                <Link to="/update" className="btn btn-primary w-100 mt-3">
                    Update Profile
                </Link>
            </div>
            <div className = "w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout} >Log Out</Button>
            </div>

        </>
    )

}
      
