import { Contacts } from 'components/Contacts/Contacts';
import { Contactsform } from 'components/Form/Form';
import { InputSearch } from 'components/InputSearch/InputSearch';
import { Component } from 'react';
import { Section } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    let contactsFromStorage = localStorage.getItem('contacts');
    if (contactsFromStorage) {
      contactsFromStorage = JSON.parse(contactsFromStorage);
      this.setState({
        contacts: contactsFromStorage,
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleSubmit = (contact, { resetForm }) => {
    if (this.checkAvailability(contact)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    contact.id = crypto.randomUUID().slice(0, 7);

    this.setState({
      contacts: [...this.state.contacts, contact],
    });
    resetForm();
  };

  checkAvailability = contact => {
    return this.state.contacts.some(
      option => option.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  deleteContact = index => {
    this.setState({
      contacts: this.state.contacts.filter(value => value.id !== index),
    });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <Section>
        <h1>Phonebook</h1>
        <Contactsform onSubmit={this.handleSubmit}></Contactsform>
        <h2>Contacts</h2>
        <InputSearch
          options={contacts}
          value={filter}
          onChange={e => this.setState({ filter: e.target.value })}
        />
        <Contacts
          options={contacts}
          filter={filter}
          deleteContact={this.deleteContact}
        ></Contacts>
      </Section>
    );
  }
}
