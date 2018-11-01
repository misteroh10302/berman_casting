import React, { Component } from 'react';
import './App.css';
import Footer from './Footer.js';
import Navigation from './Nav';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conInfo: [],
      myname: "madeline",
      value: "",
      showIn: "shown",
      showMessage: "hidden",
      error: "no-error"
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
    console.log('hello');
   this.setState({
     value: event.target.value
   });
  }

  updateMessage() {
    if (!this.state.value.includes('@')){
      this.setState({
        error: "error"
      });
    } else {
      this.setState({
        showIn: "hidden",
        showMessage: "shown",
          error: "no-error"
      });
    }

  }

  render() {
    let contactInfo;
    // if there is no post content return
    if(this.props.gridContents === undefined) {
      contactInfo = "nothing here";

    } else {
       contactInfo = this.props.gridContents.map((reg,i) =>
            <div className="contact-main">
                <div className="description">{reg.fields.entry}</div>
                <div>
                  <h3>Email</h3>
                  <a href="">{reg.fields.email}</a>
                </div>
                <div>
                  <h3>Instagram</h3>
                  <a href="">{reg.fields.instagram}</a>
                </div>
                <div>
                  <h3>Phone</h3>
                  <a href="">{reg.fields.phoneNumber}</a>
                </div>
                <div>
                  <h3>Newsletter</h3>
                  <p className={this.state.showMessage}>Thank you for your interest. Please follow the instructions sent to your email address to complete the registration. </p>
                  <input className={`${this.state.showIn} ${this.state.error}`} onChange={this.handleChange} placeholder="Email Address" value={this.state.value} type="email" name=""  />
                  <input className={this.state.showIn} onClick={this.updateMessage} type="submit" placeholder="Sign Up"  value="Sign Up"/>
                </div>
            </div>
          )
    }

    return (
      <div className="App contact">

        <Navigation contactMobile={this.props.contactMobile} titleContent={this.props.titleContent}/>
        <main>
          <div>{contactInfo}</div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Contact;
