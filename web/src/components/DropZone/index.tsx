import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoMdContact } from 'react-icons/io';

import {
  Container,
  Image,
  Input,
  NoContent
} from './styles';

import { IProps } from './types';

const Dropzone: React.FC<IProps> = (props) => {
  const urlLoaded= 
    'http://localhost:3333/uploads/noimage' === props.imageUrl ? '' : props.imageUrl
  
  const [selectedFileUrl, setSelectedFileUrl] = useState(urlLoaded);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    props.onFileUploaded(file);
  }, [props.onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <Container {...getRootProps()}>
      <Input {...getInputProps()} accept="image/*" />

      {
        selectedFileUrl 
        ? <Image src={selectedFileUrl} alt="Contact thumbnail" />
        : (
          <NoContent>
            <IoMdContact size={60} color="#0585a0" />
          </NoContent>
        )
      }
    </Container>
  )
}

export default Dropzone;
