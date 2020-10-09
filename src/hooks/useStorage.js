import { useState, useEffect } from 'react'
import { projectStorage, projectFirestore,timestamp } from '../firebase/config'

//Custom Hook : useStorage();


const useStorage = (file) => {
    const [progress,setProgress] = useState(null);
    const [error,setError] = useState(null);
    const [url,setUrl] = useState(null);

    //Everytime the file is changed the useEfect function is called,
    // The the Information Of the File is send t the Database and storage in the Firebase

    useEffect(() => {
        // references
        const storageRef = projectStorage.ref(file.name);   // Reference for the Storage
        const collectionRef = projectFirestore.collection('images');  //Reference for the Database 

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        },(err) => {
            setError(err);
        }, async() => {  // when the file upload is finished we will take the URL of the image Uploaded
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ url: url, createdAt }); // the database will have the two properties ie. first Time of creation and the the Url of the image
            setUrl(url);
        });
    },[file]);

    return { progress, url, error }

}

export default useStorage;
