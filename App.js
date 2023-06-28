import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const ContactListApp = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    // Simulate API call to fetch contacts
    const API_URL = `https://randomuser.me/api/?results=10&page=${page}`;
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const newContacts = [...contacts, ...data.results];
        setContacts(newContacts);
        setPage(page + 1);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Contact List App</h2>
      <InfiniteScroll
        dataLength={contacts.length}
        next={loadContacts}
        hasMore={true} // Assuming there are always more contacts to load
        loader={<h4>Loading...</h4>}
      >
        <ul>
          {contacts.map(contact => (
            <li key={contact.login.uuid}>
              <img src={contact.picture.thumbnail} alt={contact.name.first} />
              <span>{contact.name.first} {contact.name.last}</span>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default ContactListApp;
