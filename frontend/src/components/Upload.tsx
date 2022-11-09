import { useState } from 'react';

function Upload() {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('');

    // function handleChange
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files);
        if (!e.target.files?.length)
            return
        const file = e.target.files[0]
        console.log(URL.createObjectURL(e.target.files[0]))
        setFile(URL.createObjectURL(e.target.files[0]));
        setFilename(e.target.files[0].name);


        const url = 'http://localhost:5000/api/upload';
        const formData = new FormData();
        formData.append('filetoupload', file);

        console.log(file)

        const config = {
            method: 'POST',
            body: formData
        };

        fetch(url, config)
            .then((response) => {
                console.log(response.body)
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            <h2>Add Image:</h2>
            <input type="file" className='inputt' onChange={handleChange} />
            <img src={file} alt={filename || 'No selection'} />
        </div>
    )
}

export default Upload