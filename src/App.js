import React, { Component } from 'react';
import { database, auth, googleAuthProvider, storage } from './firebase';
import registerMessaging from './request-messaging-permission';

import Contact from './component/contact';
import AddContactModal from './component/addContactModal';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: [],
      newData: '',
      currentUser: {},
      userImages: null,
      hideModal: true,
    }

    this.userRef = database.ref('/users').child('Anonymous');
    this.contactsRef = database.ref('/guides');
    this.userStorageRef = storage.ref('/user-files').child('Anonymous');
    this.displayCurrentUser = this.displayCurrentUser.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      this.setState({ currentUser: currentUser || {} });
      if (currentUser) {
        // Init current user Refs
        this.userRef = database.ref('/users').child(currentUser.uid);
        this.userStorageRef = storage.ref('/user-files').child(currentUser.uid);
        this.contactsRef.on('value', (snapshot) => {
          let contactData = snapshot.val();
          console.log(contactData)
          contactData = Object.keys(contactData).filter((key) => {
            const contact = contactData[key];
            return contact.date != null && contact.img != null && contact.name != null;
          }).map(key => ({ key, ...contactData[key] }));
          this.setState({ contactData });
        });
        this.userRef.child('images').on('value', (snapshot) => {
          const userImages = snapshot.val();
          if (userImages) {
            this.setState({ userImages });
          }
        });
        // register function messaging alert for this user
        registerMessaging(currentUser);
        // Add user to users database if not exist
        this.userRef.once('value', (snapshot) => {
          const userData = snapshot.val();
          if (!userData) {
            this.userRef.set({ name: currentUser.displayName });
          }
        });

      } else {
        this.setState({ contactData: [], userImages: null });
      }
    });
  }

  signIn() {
    auth.signInWithPopup(googleAuthProvider);
  }

  signOut() {
    auth.signOut();
  }

  displayCurrentUser() {
    return <img className="App-nav-img" onClick={this.signOut}
      src={this.state.currentUser.photoURL}
      alt={this.state.currentUser.displayName}
    />
  }

  addContact() {
    this.setState({ hideModal: false });
  }

  closeModal() {
    this.setState({ hideModal: true });
  }

  render() {
    return (
      <div className="App">
        <AddContactModal
          hiddenModal={this.state.hideModal}
          closeModal={this.closeModal}
        />
        <div className="App-nav">
          <span className="App-nav-title">Contacts For Dex</span>
          <span className="App-nav-button">{this.state.currentUser.email ? this.displayCurrentUser() : <a href="#" onClick={this.signIn}>Sign In</a>}</span>
        </div>
        <div className="padding-top flex-container">
          <h2>Contacts</h2>
          <button className="button" onClick={() => this.addContact()}>
            &#x2b; Add Contact
          </button>
        </div>
        <div className="padding-top padding-right AppBody">
          {this.state.contactData !== [] ? (
            this.state.contactData.map((contact) =>
              <Contact
                key={contact.key}
                image={contact.img}
                name={contact.name}
                lastContact={new Date(contact.date).toDateString()}
              />
            )
          )
            : <h2> No Contacts please use the "add Contacts" button</h2>
          }
        </div>
      </div>
    );
  }
}

export default App;
