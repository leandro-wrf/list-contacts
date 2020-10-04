import React, { useState, useEffect } from 'react';
import { FaIdBadge, FaPlus, FaTrashAlt } from 'react-icons/fa';

import api from '../../service/api';

import Card from '../../components/Card';
import Add from './Add';
import Edit from './Edit';

import { Contact } from '../../@types';

import {
  Container,
  Painel,
  Top,
  ButtonAdd,
  ButtonDelete,
  ListContacts,
  Grid
} from './styles';

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacs] = useState(0);
  const [contactsSelected, setContactsSelected] = useState<number[]>([]);
  const [contactEdit, setContactEdit] = useState<Contact>({
    id: 0,
    image: '',
    firstName: '',
    lastName: '',
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
      const serializedResponse =
        response.data.map((contact: any) => {
          return {
            firstName: contact.first_name,
            lastName: contact.last_name,
            ...contact
          }
        });

      setContacts(serializedResponse);
    });
  }, []);

  function cardSelectToRemove(id: number) {
    setContactsSelected([...contactsSelected, id]);
  }

  function cardUnselect(id: number) {
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

  function handleOpenEditContact(contact: Contact) {
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
    <Container>
      <Painel>
        <Top>
          <FaIdBadge size={40} color="#0585a0"/>

          <ButtonAdd onClick={() => setAddContactVisible(true)}>
            <FaPlus size={40} color="#46ee89"/>
          </ButtonAdd>
        </Top>

        <ButtonDelete
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
        </ButtonDelete>
      </Painel>

      <ListContacts>
        <Grid>
          {
            contacts.map(contact => (
              <Card
                key={contact.id}
                data={contact} 
                select={() => cardSelectToRemove(contact.id)}
                unselect={() => cardUnselect(contact.id)}
                modalVisible={() => handleOpenEditContact(contact)}
              />
            ))
          }
        </Grid>
      </ListContacts>

      <Add
        visible={addContactVisible}
        close={closeAddContact}
      />

      <Edit
        visible={editContactVisible}
        close={closeEditContact}
        data={contactEdit}
        loadingData={loadingData}
      />
    </Container>
  )
}

export default Contacts;
