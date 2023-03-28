import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const currentContacts = JSON.parse(localStorage.getItem('contacts')) ?? ''
    currentContacts && setContacts(currentContacts);
  }, [])
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const onAddContact = (newContact) => {
    if (contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
      alert(`${newContact.name} is already in contacts`)
      return;
    }
    setContacts(prevState => {
      return [...prevState, newContact]
    })
  }
  const onDeleteContact = (contactId) => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId)
    })
  }
  const onFilter = (e) => {
    setFilter(e.currentTarget.value)
  }
  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

  return (<Container ><h1>Phonebook</h1>
    <ContactForm onSubmit={onAddContact} />
    <h2>Contacts</h2>
    <Filter value={filter} onChange={onFilter} />
    <ContactList contacts={visibleContacts} onDelete={onDeleteContact} />
  </Container >)
}
