import classNames from 'classnames'
import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { readFile } from '../helpers'

function MyDropzone() {
  const [txt, settxt] = useState('Empty!')
  const onDrop = useCallback(async (acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles)
    settxt(await readFile(acceptedFiles[0]))
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className={classNames('filedropper', isDragActive ? 'dragging' : 'standby')}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
      {txt}
    </div>
  )
}

export default MyDropzone