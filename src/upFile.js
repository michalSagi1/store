import React, { useRef, useState } from "react";


export default function UpFile() {
    const [file, setFile] = useState({})
    const form = useRef(null)
    const submit = (e) => {
        e.preventDefault()
        const data = new FormData(form.current)
        fetch("http://localhost:3001/api/files/file", { method: "POST", body: data, headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => res.json())
            .then((json) => console.log(json))

    }

    return (
        <>
            <form ref={form} onSubmit={submit}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </form>
            <div>file name: {file.name}</div>
            <div>file size: {file.size / 1000} kb</div>
            <div>file type: {file.type}</div>

            <input type="submit" name="send" />
        </>
    )


}
