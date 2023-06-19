import { Component } from 'react';
import PropTypes from 'prop-types';
import { Contact } from './Contacts.styled';
import { Button } from 'components/Form/Form.styled';

export class Contacts extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string,
    deleteContact: PropTypes.func.isRequired,
  };
  render() {
    const { filter, options, deleteContact } = this.props;
    return (
      <ul>
        {filter === ''
          ? options.map(contact => (
              <Contact key={crypto.randomUUID().slice(0, 5)}>
                <p>
                  {contact.name}: {contact.number}
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    deleteContact(contact.id);
                  }}
                >
                  Delete
                </Button>
              </Contact>
            ))
          : options
              .filter(value =>
                value.name.toLowerCase().includes(`${filter.toLowerCase()}`)
              )
              .map(contact => (
                <Contact key={crypto.randomUUID().slice(0, 5)}>
                  <p>
                    {contact.name}: {contact.number}
                  </p>
                  <Button
                    type="button"
                    onClick={() => {
                      deleteContact(contact.id);
                    }}
                  >
                    Delete
                  </Button>
                </Contact>
              ))}
      </ul>
    );
  }
}
