import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router-dom'
// Import contentful
var contentful = require('contentful')

class Footer extends Component {
    state = {
      value: "",
      showIn: "shown",
      showMessage: "hidden",
      error: "no-error",
      contactContent:[
        {
          "fields": {
            "email": '',
            "instagram": '',
            "phoneNumber": ''
          }
        }

      ],
      email: 'email',
      instagram: 'instagram',
      phone: '000-000-000',
      emailMessage: 'I wanted to reach out to you.',
      newsState: 'hidden',
      newsButton: "shown",

    }

    handleChange = this.handleChange.bind(this);
    updateMessage = this.updateMessage.bind(this);
    showNews = this.showNews.bind(this);
    updateFooter = this.updateFooter.bind(this);


  componentWillMount() {
    var client = contentful.createClient({
      space: 'g0gogpe6z8m0',
      accessToken: '635d0733430094c3ee8ed1a81dab920236052730f153dbc4eede999809128662'
    });
    // Get the contact page
    client.getEntries({ content_type: 'contact'})
      .then((res) => {
        var contactContent = res.items
        this.setState({contactContent});
       });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateFooter);
    window.addEventListener('load', this.updateFooter);

  }

  handleChange(event) {
   this.setState({
     value: event.target.value
   });
  }

  updateFooter() {

      if (window.innerWidth < 1120) {
        // this.a.innerText = "EMAIL";
        // this.insta.innerText = "INSTAGRAM";
        // this.phone.innerText = "PHONE";
        this.setState({
            email: 'EMAIL',
            instagram:'INSTAGRAM',
            phone: 'PHONE'
        })
      } else {
        this.setState({
            email: this.state.contactContent[0].fields.email,
            instagram:this.state.contactContent[0].fields.instagram,
            phone: this.state.contactContent[0].fields.phoneNumber
        })
        // this.state.email = this.state.contactContent[0].fields.email;
        // this.state.instagram = this.state.contactContent[0].fields.instagram;
        // this.state.phone = this.state.contactContent[0].fields.phoneNumber;
      }


  }

  showNews() {
    this.setState({newsState: "shown",newsButton: "hidden"})
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
            <Link id="about" to='/project-category/faces'>Faces</Link>
            <Link to='/project-category/commercial'>Commerical</Link>
            <Link to='/project-category/editorial'>Editorial</Link>
            <Link id="contact" to='/contact'>Contact</Link>
            <button id="newslettter" className={`${this.state.newsButton}`} onClick={this.showNews}>Newsletter</button>
            <p
              className={this.state.showMessage}>
                Thank you for subscribing.
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
            <a href={`mailto:arielleberman@gmail.com`} id="emailText" ref={(item) => {this.a = item}}>{this.state.email}</a>
            <a target="_blank" href={`https://www.instagram.com/${userInstagram}`} id="instagram" ref={(item) => {this.insta = item}}>{this.state.instagram}</a>
            <a  href={`tel:${this.state.phone}`} id="phone" ref={(item) => {this.phone = item}}>{this.state.phone}</a>
            <a href="" id="sig">&copy;	 2018 Arielle Berman</a>
          </nav>
      </footer>
    );
  }
}

export default Footer;
