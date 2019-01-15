import React, { Component } from 'react';
import './App.css';
import Footer from './Footer/Footer.js';
import Navigation from './Nav';
import {Link} from 'react-router-dom'


class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conInfo: [],
      myname: "madeline",
      value: "",
      showIn: "shown",
      showMessage: "hidden"
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }


  componentDidMount(){
    this.setState({
      conInfo: this.props.gridContents
    })
  }

  handleChange(event) {
   this.setState({
     showIn: event.target.value
   });
  }

  updateMessage() {
   this.setState({
     showIn: "hidden",
     showMessage: "shown"
   });
  }

  render() {
    let email, instagram, phone;
    if (!this.props.contactMobile) {
      email = "email"; instagram = 'instagram'; phone: 'phone';
    } else {
      email = this.props.contactMobile[0].fields.email
      instagram = this.props.contactMobile[0].fields.instagram
      phone = this.props.contactMobile[0].fields.phoneNumber
    }
    return (
      <div className="App contact">
      <Navigation
        contactMobile={this.props.contactMobile}
        titleContent={this.props.titleContent} />
        <main>
          <div>
          <div className="contact-main not-found">
              <div className="description">
                <p>404 Error: The page you are looking for does not exist or has been removed.</p>
                <p>Please visit the <Link to="/">Homepage</Link> to view latest works.</p>
              </div>
              <div>
                <h3>Email</h3>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div>
                <h3>Instagram</h3>
                <a target="_blank" href={`https://www.instagram.com/${instagram}`}>{instagram}</a>
              </div>
              <div>
                <h3>Phone</h3>
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
              <div>
                <h3>Newsletter</h3>
                <p className={this.state.showMessage}>Thank you for your interest. Please follow the instructions sent to your email address to complete the registration. </p>
                <input className={this.state.showIn} onChange={this.handleChange} placeholder="Email Address" value={this.state.value} type="email" name=""  />
                <input className={this.state.showIn} onClick={this.updateMessage} type="submit" placeholder="Sign Up" value="Sign Up"/>
              </div>
          </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default NotFound;
