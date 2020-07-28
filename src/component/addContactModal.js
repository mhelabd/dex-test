import React, { Component } from 'react';
import { database, storage } from '../firebase';

import '../App.css';

class AddContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      img: null,
      date: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.contactsRef = database.ref('/guides');
    this.userRef = database.ref('/users').child('Anonymous');
    this.userStorageRef = storage.ref('/user-files').child('Anonymous');

  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleImage = (e) => {
    const img = e.target.files[0];
    this.setState({ img });
  }

  onSubmit(event) {
    event.preventDefault();
    const { name, img, date } = this.state;
    const uploadTask = this.userStorageRef.child(img.name).put(img, { contentType: img.type });
    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100 + '%');
    });
    uploadTask.then((snapshot) => {
      this.userRef.child('images').push(snapshot.downloadURL);
      this.contactsRef.push({ name, img: snapshot.downloadURL, date });
    });
    this.props.closeModal();
  }

  render() {
    const showHideClassName = this.props.hiddenModal ? "modal display-none" : "modal display-block";
    return (
      <div className={showHideClassName}>
        <div className="modal-main">
          <div className="left-full">
            <h2>Create a New Contact</h2>
            <div>
              <form onSubmit={this.onSubmit}>
                <div>
                  <label htmlFor="name" className="left">Contact Name:</label>
                </div>
                <input type="text" id="name" name="name" placeholder="Contact Name.." onChange={this.handleChange} />
                <div>
                  <label htmlFor="name" className="left">Image:</label>
                </div>
                <div>
                  <input type="file" id="img" name="img" accept="image/*" className="image-input" onChange={this.handleImage} />
                </div>
                <div>
                  <label htmlFor="name" className="left">Last Contact Date:</label>
                </div>
                <div>
                  <input type="date" id="date" name="date" placeholder="Contact name.." onChange={this.handleChange} />
                </div>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default AddContactModal;
