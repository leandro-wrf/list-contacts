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
  ButtonDisabled,
  ButtonEnabled
} from './styles';

const EditContact: React.FC<IProps> = ({ visible, close, data, loadingData }) => {
  const [buttonActived, setButtonActived] = useState(true);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState(data.uf);
  const [selectedCity, setSelectedCity] = useState(data.city);

  const [selectedFile, setSelectedFile] = useState<File>();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    setFormData({
      firstName: data.firstName,
      lastName: data.lastName,
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

    getCities(selectedUf).then(response => {
      setCities(response);
    });
  }, [selectedUf]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({...formData, [name]: value});
    setButtonActived(false);
  }

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
    setButtonActived(false);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
    setButtonActived(false);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { firstName, lastName, email, phone } = formData;
    const uf = selectedUf;
    const city = selectedCity;

    const content = new FormData();
      content.append('first_name', firstName);
      content.append('last_name', lastName);
      content.append('email', email);
      content.append('phone', phone);
      content.append('uf', uf);
      content.append('city', city);

      if(selectedFile) {
        content.append('image', selectedFile);
      }

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
            <Input 
              type="text" 
              placeholder="First name"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <Input 
              type="text"
              placeholder="Last name"
              id="lastName"
              name="lastName"
              value={formData.lastName}
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
              placeholder="Phone: (11) 1 1111-1111"
              id="phone"
              name="phone"
              value={formData.phone}
              pattern="([1-9]{2})[0-9]{8,9}"
              onChange={handleInputChange}
            />
            {
              buttonActived 
              ? <ButtonDisabled disabled>SAVE</ButtonDisabled>
              : <ButtonEnabled type="submit">SAVE</ButtonEnabled>
            }
          </FormGroup>
        </Form>
      </Container>
    </Modal>
  );
}

export default EditContact;
