import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from '../../GlobalStyled/GlobalStyled.styled';
import { Title } from './App.styled';

import ContactForm from '../ContactForm';
import ContactsList from '../ContactsList';
import Filter from '../Filter';

export default function Add() {
  const [contacts, setContacts] = useState(() => {
    const userContacts = JSON.parse(localStorage.getItem('contacts'));
    return userContacts ? userContacts : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkContact = name => {
    const normalizeName = name.toLowerCase();

    return contacts.find(
      contact => normalizeName === contact.name.toLocaleLowerCase()
    );
  };

  const addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };

    if (checkContact(name)) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts(prevContacts => [contact, ...prevContacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleNumbers = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const changeFilter = evt => setFilter(evt.currentTarget.value);

  const visibleNumbers = getVisibleNumbers();

  return (
    <>
      <Title>Phonebook</Title>
      <ContactForm submit={addContact} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList
        visibleNumbers={visibleNumbers}
        onDeleteContact={deleteContact}
      />
      <GlobalStyle />
    </>
  );
}
