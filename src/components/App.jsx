import { useEffect } from 'react';
import { ContactsForm } from './ContactForm';
import { Contacts } from './Contacts';
import { AppBlock } from './App.styled';
import { Section } from './Section';
import { ContactsFilter } from './ContactsFilter';
import { useState } from 'react';


const initialContacts = localStorage.getItem('contacts')
? JSON.parse(localStorage.getItem('contacts'))
: [];

export function App() { 
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  const filterHandle = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const onClickDelete = (e, id) => {
    setContacts([...contacts.filter(elem => elem.id !== id)]);
  };

  const addContact = newContact => {
    setContacts(prev => [...prev, newContact]);
  };
  
  const findFilterContact = () => {
    const filterName = filter.trim().toLowerCase();
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(filterName)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <AppBlock>
      <ContactsForm contacts={contacts} addContact={addContact} />
      <Section title="Contacts">
        <ContactsFilter filter={filter} filterHandle={filterHandle} />
        <Contacts
          contacts={findFilterContact()}
          onClickDelete={onClickDelete}
        />
      </Section>
    </AppBlock>
  );
}

