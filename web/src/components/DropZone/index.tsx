import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoMdContact } from 'react-icons/io';

import './styles.css';

interface IProps {
  onFileUploaded: (file: File) => void;
  imageUrl?: string;
}

const Dropzone: React.FC<IProps> = ({ onFileUploaded, imageUrl }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState(
    imageUrl === 'http://192.178.31.105:3333/uploads/noimage' 
    ? '' 
    : imageUrl
  );

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);
    console.log(fileUrl);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/jpg, image/png'
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {
        selectedFileUrl 
        ? <img src={selectedFileUrl} alt="Contact thumbnail" />
        : (
          <p>
            <IoMdContact />
          </p>
        )
      }
    </div>
  )
}

export default Dropzone;
