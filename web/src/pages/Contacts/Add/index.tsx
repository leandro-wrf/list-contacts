import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Modal from 'react-modal';

import api from '../../../service/api';
import getUfs from '../../../service/requests/getUfs';
import getCities from '../../../service/requests/getCities';

import DropZone from '../../../components/DropZone';

import { IProps } from './types';

import {
  Container,
  Form,
  FormGroup,
  Input,
  InputEmail,
  Select,
  Button
} from './styles';

const AddContact: React.FC<IProps> = props => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const [selectedFile, setSelectedFile] = useState<File>();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    getUfs().then(response => {
      setUfs(response);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    getCities(selectedUf).then(response => {
      setCities(response);
    });
  }, [selectedUf]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({...formData, [name]: value});
  }

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { firstName, lastName, email, phone } = formData;
    const uf = selectedUf;
    const city = selectedCity;

    const data = new FormData();
      data.append('first_name', firstName);
      data.append('last_name', lastName);
      data.append('email', email);
      data.append('phone', phone);
      data.append('uf', uf);
      data.append('city', city);

      if(selectedFile) {
        data.append('image', selectedFile);
      }

    await api.post('/contact', data);

    alert('Contact created');

    setSelectedUf('0');
    setSelectedCity('0');
    props.close();
  }

  return (
    <Modal
      isOpen={props.visible}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={props.close}
      style={{
        content: {
          width: "400px",
          marginTop: "32px",
          marginBottom: "32px",
          marginRight: "auto",
          marginLeft: "auto",
          borderRadius: "4px"
        }
      }}
      ariaHideApp={false}
    >
      <Container>
        <DropZone onFileUploaded={setSelectedFile} imageUrl="http://localhost:3333/uploads/noimage"/>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input 
              type="text" 
              placeholder="First name..."
              id="firstName"
              name="firstName"
              onChange={handleInputChange}
            />
            <Input 
              type="text"
              placeholder="Last name..."
              id="lastName"
              name="lastName"
              onChange={handleInputChange}
            />
          </FormGroup>

          <InputEmail
            className="modal-form-email"
            type="email"
            placeholder="Email..."
            id="email"
            name="email"
            onChange={handleInputChange}
          />

          <FormGroup>
            <Select
              name="uf"
              id="uf"
              value={selectedUf}
              onChange={handleSelectUf}
            >
              <option value="0">Select UF</option>
              {ufs.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </Select>

            <Select
              name="city"
              id="city"
              value={selectedCity}
              onChange={handleSelectCity}
            >
              <option value="0">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Input
              type="tel" 
              placeholder="Phone: (xx) x xxxx-xxxx"
              id="phone"
              name="phone"
              pattern="([1-9]{2})[0-9]{8,9}"
              onChange={handleInputChange}
            />
            <Button type="submit">
              REGISTER
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </Modal>
  );
}

export default AddContact;
