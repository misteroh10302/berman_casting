import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom'


// Import contentful
var contentful = require('contentful')

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      showIn: "shown",
      showMessage: "hidden",
      error: "no-error",
      contactContent:[],
      newsState: 'hidden',
      newsButton: "shown"
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.showNews = this.showNews.bind(this);
    this.updateFooter = this.updateFooter.bind(this);

  }

  componentWillMount() {
    var client = contentful.createClient({
      space: 'g0gogpe6z8m0',
      accessToken: '635d0733430094c3ee8ed1a81dab920236052730f153dbc4eede999809128662'
    });
    // Get the contact page
    client.getEntries({ content_type: 'contact'
    }).then(function(res){
      var contactContent = res.items
      this.setState({
         contactContent: contactContent
       });
     }.bind(this));

  }

  componentDidMount() {
    window.addEventListener('resize', this.updateFooter);

  }

  handleChange(event) {
   this.setState({
     value: event.target.value
   });
  }

  updateFooter() {
    if(this.a === null) {
      return;
    } else {
      if (window.innerWidth < 1075) {
        this.a.innerText = "EMAIL";
        this.insta.innerText = "INSTAGRAM";
        this.phone.innerText = "PHONE";
      } else {
        this.a.innerText = this.state.contactContent[0].fields.email;
        this.insta.innerText = this.state.contactContent[0].fields.instagram;
        this.phone.innerText = this.state.contactContent[0].fields.phoneNumber;
      }
    }

  }

  showNews() {
    this.setState({
      newsState: "shown",
      newsButton: "hidden"
    })

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
    let userEmail;
    let userInstagram;
    let userPhone;

    if (this.state.contactContent.length === 0) {
      userEmail = "email";
      userInstagram = "instagram";
      userPhone = "000 - 000 - 000";
    } else {
      userEmail = this.state.contactContent[0].fields.email;
      userInstagram =  this.state.contactContent[0].fields.instagram;
      userPhone = this.state.contactContent[0].fields.phoneNumber;
    }

    return (
      <footer>
          <nav id="footer-left">
            <Link id="about" to='/faces'>Faces</Link>
            <Link to='/commercial'>Commerical</Link>
            <Link to='/editorial'>Editorial</Link>
            <Link id="contact" to='/contact'>Contact</Link>
            <button id="newslettter" className={`${this.state.newsButton}`} onClick={this.showNews}>Newsletter</button>
            <p
              className={this.state.showMessage}>
                Thank you for your subscribing.
            </p>
            <div className={` ${this.state.newsState} newsletter`}>
              <input
                className={`${this.state.showIn} ${this.state.error}`}
                onChange={this.handleChange}
                placeholder="Email Address"
                value={this.state.value}
                type="email"
                name=""  />
              <input
                className={this.state.showIn}
                onClick={this.updateMessage}
                type="submit"
                placeholder="submit"
                value="Sign Up"/>
            </div>
          </nav>
          <nav id="footer-right">
            <a href="" id="emailText" ref={(item) => {this.a = item}}>{userEmail}</a>
            <a href="" id="instagram" ref={(item) => {this.insta = item}}>{userInstagram}</a>
            <a href="" id="phone" ref={(item) => {this.phone = item}}>{userPhone}</a>
            <a href="" id="sig">&copy;	 2018 Arielle Berman</a>
          </nav>
      </footer>
    );
  }
}

export default Footer;
