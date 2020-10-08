import React, {useState} from 'react'

const UploadForm = () => {

    const [file, setFile] =  useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const changeHandler = (e) => {
        //console.log('changed');
        let selected = e.target.files[0];   // to know the information of the file imported from the Computer
        //console.log(selected);
        if(selected && types.includes(selected.type)){
            setFile(selected);
            setError(null);
        }else{
            setFile(null);
            setError('Please Select An Image File (png or jpeg)');
        }
    }

    return(
        <form>
            <input type = "file" onChange = {changeHandler}/>
            <div className = "output">
                { error && <div className = "error"> {error} </div> }
                {  file && <div>{ file.name }</div> }
            </div>
        </form>
    );
}

export default UploadForm;
