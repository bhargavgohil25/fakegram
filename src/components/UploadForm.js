import React, {useState} from 'react'
import ProgressBar from './ProgressBar'


const labelStyle = {
    display: "block",
    width: "30px",
    height: "30px",
    border: "1px solid #e99d97",
    borderRadius: "50%",
    margin: "10px auto",
    lineHeight: "30px",
    color: "#e99d97",
    fontWeight: "bold",
    fontSize: '24px'
}

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
            <label style={
                labelStyle
            }>
                <input type = "file" onChange = {changeHandler}/>
                <span>+</span>
            </label>
            <div className = "output">
                { error && <div className = "error"> {error} </div> }
                { file && <div>{ file.name }</div> }
                { file && <ProgressBar file = {file} setFile={setFile}/> }
            </div>
        </form>
    );
}

export default UploadForm;
