import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'


const ProgressBar = ({ file, setFile }) => {

    const { progress, url } = useStorage(file);    // we get url and progress from the useStorage Hook that we create

    //console.log(progress, url);
    useEffect(() => {             // This useEffect() is for : when the upload is completed the progress bar removes autoatically
        if(url){                  // We get the URL only when the File is uploaded fully.
            setFile(null);        // And when we setFile(null)  the progressBar won't run as in Upload form the file paramete will null and progressBar will not run 
        }
    }, [url, setFile])

    return (
        <div className = "progress-bar" style= {{width: progress + '%'}}></div>
    );
}

export default ProgressBar;