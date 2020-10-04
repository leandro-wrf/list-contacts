import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
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
  InputEmail
} from './styles';

const EditContact: React.FC<IProps> = ({ visible, close, data, loadingData }) => {
  const [stateFix, setStateFix] = useState(true);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState(data.uf);
  const [selectedCity, setSelectedCity] = useState(data.city);

  const [selectedFile, setSelectedFile] = useState<File>();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    setFormData({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone
    })

    setSelectedUf(data.uf);
    setSelectedCity(data.city);
  }, [loadingData]);

  useEffect(() => {
    getUfs().then(response => {
      setUfs(response);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    getCities().then(response => {
      setCities(response);
    });
  }, [selectedUf]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    console.log(formData.first_name);

    setFormData({...formData, [name]: value});
    setStateFix(false);
  }

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
    setStateFix(false);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
    setStateFix(false);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { first_name, last_name, email, phone } = formData;
    const uf = selectedUf;
    const city = selectedCity;

    console.log(first_name, last_name, email, phone, uf, city);

    const content = new FormData();
      content.append('first_name', first_name);
      content.append('last_name', last_name);
      content.append('email', email);
      content.append('phone', phone);
      content.append('uf', uf);
      content.append('city', city);

      if(selectedFile) {
        content.append('image', selectedFile);
      }

      console.log(content);
      console.log(selectedFile);

    await api.put(`/contact/${data.id}`, content);

    alert('Contact updated');

    close();
  }

  return (
    <Modal
      isOpen={visible}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={close}
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
        <DropZone 
          onFileUploaded={setSelectedFile}
          imageUrl={data.image}
        />

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <input 
              type="text" 
              placeholder="First name"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
            <input 
              type="text"
              placeholder="Last name"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </FormGroup>

          <InputEmail
            className="modal-form-email"
            type="email"
            placeholder="Email..."
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <FormGroup>
            <select 
              name="uf"
              id="uf"
              value={selectedUf}
              onChange={handleSelectUf}
            >
              <option value="0">Select UF</option>
              {ufs.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>

            <select
              name="city"
              id="city"
              value={selectedCity}
              onChange={handleSelectCity}
            >
              <option value="0">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <input 
              type="tel" 
              placeholder="Phone: (11) 1 1111-1111"
              id="phone"
              name="phone"
              value={formData.phone}
              pattern="([1-9]{2})[0-9]{8,9}"
              onChange={handleInputChange}
            />
            <button 
              className={stateFix ? "button-disabled desactivated" : "button-disabled activated"}
              type="submit"
              disabled={stateFix ? true : false}
            >
              SAVE
            </button>
          </FormGroup>
        </Form>
      </Container>
    </Modal>
  );
}

export default EditContact;
