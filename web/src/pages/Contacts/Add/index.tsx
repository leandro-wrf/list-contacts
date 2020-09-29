import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import api from '../../service/api';

import DropZone from '../DropZone';

import IProps from '../../@types/IPropsAddContact';
import {
  IIBGEUFResponse,
  IIBGECityResponse
} from '../../@types/IIBGE';

import './styles.css';

const AddContact: React.FC<IProps> = props => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [citys, setCities] = useState<string[]>([]);
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
    axios.get<IIBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios.get<IIBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
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
      <div className="modal">
        <DropZone onFileUploaded={setSelectedFile} imageUrl="http://192.178.31.105:3333/uploads/noimage"/>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form-group">
            <input 
              type="text" 
              placeholder="First name"
              id="firstName"
              name="firstName"
              onChange={handleInputChange}
            />
            <input 
              type="text"
              placeholder="Last name"
              id="lastName"
              name="lastName"
              onChange={handleInputChange}
            />
          </div>

          <input
            className="modal-form-email"
            type="email"
            placeholder="Email..."
            id="email"
            name="email"
            onChange={handleInputChange}
          />

          <div className="modal-form-group">
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
              {citys.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="modal-form-group">
            <input 
              type="tel" 
              placeholder="Phone: (11) 1 1111-1111"
              id="phone"
              name="phone"
              pattern="([1-9]{2})[0-9]{8,9}"
              onChange={handleInputChange}
            />
            <button type="submit">
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddContact;
