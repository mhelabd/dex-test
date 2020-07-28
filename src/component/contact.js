import React, { Component } from 'react';

import '../App.css';

class Contact extends Component {
  render() {
    return (
      <div className="card flex-container">
        <img className="image" alt="profile_pic" src={this.props.image} />
        <p>{this.props.name}</p>
        <p className="last-contact">{this.props.lastContact}</p>
      </div>
    );
  }
}

export default Contact;