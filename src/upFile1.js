import { useState } from 'react';
const axios = require('axios').default;


function Form() {

    const [file, setFile] = useState({ fileName: "", size: "", type: "" });



    const onSubmit = (e) => {
        e.preventDefault();

        let bodyFormData = new FormData();

        bodyFormData.append('fileName', e.target.fileInput.files[0]);

        // console.dir(e.target.fileInput)

        axios({
            method: "post",
            url: "http://localhost:3001/api/files/upload",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }



    const onChangeHandler = (e) => {
        const fileSize = (e.target.files[0].size / 1000) + "KB";

        setFile((current) => {
            return {
                ...current,
                fileName: e.target.files[0].name,
                size: fileSize,
                type: e.target.files[0].types
            }
        });
    }

    return (
        <div className="form">
            <form onSubmit={onSubmit}>
                <input name="fileInput" type="file" onChange={onChangeHandler}>
                </input>
                <button>Upload</button>
                <h3>File Name: {file.fileName} </h3>
                <h3> File Size: {file.size} </h3>
                <h3> File Type: {file.type}</h3>
            </form>
        </div>
    )
}

export default Form;