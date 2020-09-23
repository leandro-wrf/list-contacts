import React, { useState, useEffect } from 'react';
import { FaIdBadge, FaPlus, FaTrashAlt } from 'react-icons/fa';

import api from '../../service/api';

import Card from '../../components/Card';
import AddContact from '../../components/AddContact';
import EditContact from '../../components/EditContact';

import IContact from '../../@types/IContact';

import './styles.css';

const Contacts = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [loadingContacts, setLoadingContacs] = useState(0);
  const [contactsSelected, setContactsSelected] = useState<number[]>([]);
  const [eachCardSelected, seteachCardSelected] = useState(false);
  const [contactEdit, setContactEdit] = useState<IContact>({
    id: 0,
    image: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    uf: '',
    city: '',
  });

  const [loadingData, setLoadingData] = useState(0);

  const [addContactVisible, setAddContactVisible] = useState(false);
  const [editContactVisible, setEditContactVisible] = useState(false);

  useEffect(() => {
    api.get('/contacts').then(response => {
      setContacts(response.data);
    });
  }, [loadingContacts]);

  function cardSelectToRemove(id: number) {
    setContactsSelected([...contactsSelected, id]);
  }

  function cardDeselect(id: number) {
    const index = contactsSelected.indexOf(id);
    if( index > -1) {
      const copyArray = contactsSelected;
      const newContactsSelected = copyArray.splice(0, index);

      return setContactsSelected(newContactsSelected); 
    }
  }

  async function handleDelete() {
    await api.delete(`/contact/${contactsSelected}`)

    setContactsSelected([]);
    setLoadingContacs(loadingContacts + 1);
  }

  function handleOpenEditContact(contact: IContact) {
    setContactEdit(contact);
    setEditContactVisible(true);
    setLoadingData(loadingData + 1);
  }

  function closeAddContact() {
    setAddContactVisible(false);
    setLoadingContacs(loadingContacts + 1);
  }

  function closeEditContact() {
    setEditContactVisible(false);
    setLoadingContacs(loadingContacts + 1);
  }

  return (
    <div className="content-page">
      <div className="painel">
        <div className="painel-top">
          <FaIdBadge size={40} color="#0585a0"/>

          <button
            className="painel-button-top"
            onClick={() => setAddContactVisible(true)}
          >
            <FaPlus 
              size={40} 
              color="#46ee89"
            />
          </button>
        </div>

        <button 
          className="painel-button-bottom"
          type="submit"
          disabled={
            contactsSelected.length === 0
            ? true : false
          }
          onClick={handleDelete}
        >
          <FaTrashAlt 
            size={32} 
            color={
              contactsSelected.length === 0 
              ? "#878787" : "#fa4e4e"
            }
          />
        </button>
      </div>

      <main>
        <div className="list-grid">
          {
            contacts.map(contact => (
              <Card
                key={contact.id}
                data={contact} 
                selected={() => cardSelectToRemove(contact.id)}
                deselect={() => cardDeselect(contact.id)}
                setEditContactVisible={() => handleOpenEditContact(contact)}
              />
            ))
          }
        </div>
      </main>

      <AddContact
        visible={addContactVisible}
        close={closeAddContact}
      />

      <EditContact
        visible={editContactVisible}
        close={closeEditContact}
        data={contactEdit}
        loadingData={loadingData}
      />
    </div>
  )
}

export default Contacts;
