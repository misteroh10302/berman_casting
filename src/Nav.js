import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom'
import logo from './berman.png';

class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      navColor: "white",
      mobileOpen: 'hidden',
      mobIsOpen: 'closed',
      titleContent: this.props.titleContent,
      faceState: "hidden",
      commState: "hidden",
      editState: "hidden",
      contact: this.props.contactMobile,
      nameOfPage: this.props.nameOfPage,
      showMessage: "hidden",
      error: "no-error",
      contactContent:[]
    }

    this.onScrollColor = this.onScrollColor.bind(this);
    this.openMobile = this.openMobile.bind(this);
    this.toggleFace = this.toggleFace.bind(this);
    this.toggleComm = this.toggleComm.bind(this);
    this.toggleEditorial = this.toggleEditorial.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.removeFixed = this.removeFixed.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.fadeBack = this.fadeBack.bind(this);
  }

  componentWillMount(){
    window.addEventListener('scroll',this.onScrollColor);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll',this.onScrollColor, false);
  }

  openMobile() {
    let pageScrollTop = window.scrollY;

    if(this.state.mobileOpen === "hidden") {
      this.setState({
        mobileOpen: "showNav",
        mobIsOpen: 'mobOpen'
      })

      document.querySelector('body').classList.add('fix-background');
      this.setState({
        topPos: pageScrollTop
      })
    } else {
      this.setState({
        mobileOpen: "hidden",
        mobIsOpen: 'closed'
      })
      document.querySelector('body').classList.remove('fix-background');
      window.scrollTo(0, this.state.topPos);
    }

  }


  onScrollColor(){
    let scrollHeight = window.innerHeight;
    let scrollPos = window.scrollY;
    let morePosts = this.props.scrollToPoint;

    if (scrollPos > scrollHeight - 60) {
      this.setState({
        navColor: "black"
      })
    } else if (scrollPos < scrollHeight - 60) {
      this.setState({
        navColor: "white"
      })
    }

    if (scrollPos > morePosts) {
      this.setState({
        nameOfPage: this.props.postClass
      })
    } else if (scrollPos < morePosts) {
      this.setState({
        nameOfPage: this.props.nameOfPage
      })
    }

  }

  toggleFace(){
    if(this.state.faceState === "hidden") {
      this.setState({
        faceState: "shown",
      })
    } else {
      this.setState({
        faceState: "hidden",
      })
    }
  }

  toggleComm(){

    if(this.state.commState === "hidden") {
      this.setState({
        commState: "shown",
      })
    } else {
      this.setState({
        commState: "hidden",
      })
    }
  }

  toggleEditorial(){
    if(this.state.editState === "hidden") {
      this.setState({
        editState: "shown",
      })
    } else {
      this.setState({
        editState: "hidden",
      })
    }
  }


    handleChange(event) {
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

  fadeOut(e) {
    const allNavItems = document.querySelectorAll('#left-navigation a , #right-navigation a');
    allNavItems.forEach( (items) => {
      items.classList.add('lighter__nav');
    })
    e.target.classList.remove('lighter__nav')

  }

  fadeBack(e) {
    const allNavItems = document.querySelectorAll('#left-navigation a , #right-navigation a');
    allNavItems.forEach( (items) => {
      items.classList.remove('lighter__nav');
    })
  }

  removeFixed() {
    document.querySelector('body').classList.remove('fix-background');

  }


  render() {
      let faceTitles = [];
      let commercialTitles = [];
      let editorialTitles = [];
      if (this.props.titleContent !== undefined ) {
        faceTitles = this.props.titleContent.map(function(reg,i) {
           if (reg.fields.tag ==="faces") {
             return <li>   <Link key={i} to={'/'+reg.fields.title}> {reg.fields.title}</Link></li>;
           }
        })

       commercialTitles = this.props.titleContent.map(function(reg,i) {
          if (reg.fields.tag ==="commercial") {
            return <li>   <Link key={i} to={'/'+reg.fields.title}> {reg.fields.title}</Link></li>;
          }
       })

        editorialTitles = this.props.titleContent.map(function(reg,i) {
           if (reg.fields.tag ==="editorial") {
             return <li>   <Link key={i} to={'/'+reg.fields.title}> {reg.fields.title}</Link></li>;
           }
        })
      }


        let contactInfo;
        let email;
        let instagram;
        let phone;
       if (this.props.contactMobile === undefined) {
           contactInfo = '';
           email  = "";
           instagram = "";
           phone = "";
       }else {
           contactInfo = this.props.contactMobile[0].fields.entry;
           email  = this.props.contactMobile[0].fields.email;
           instagram = this.props.contactMobile[0].fields.instagram;
           phone = this.props.contactMobile[0].fields.phoneNumber;

       }

    return (
      <header className={this.state.navColor + " nav-header"}>
        <nav id="left-navigation" className="desktop">
          <Link
            onMouseOver={this.fadeOut}
            onMouseLeave = {this.fadeBack}
            id='face'
            to='/faces'>
              Faces
            </Link>
          <Link
            onMouseOver={this.fadeOut}
            onMouseLeave = {this.fadeBack}
            id='comm'
            to='/commercial'>
              Commerical
            </Link>
          <Link
            onMouseOver={this.fadeOut}
            onMouseLeave = {this.fadeBack}
            id='edit'
            to='/editorial'>
              Editorial
            </Link>
        </nav>
        <nav id="middle-navigation" className="desktop">
          <h1><Link to='/'><img src={logo} alt="Arielle Berman" /> </Link></h1>
          <h2>Casting </h2>
        </nav>
        <nav id="right-navigation" className="desktop">
          <Link onMouseOver={this.fadeOut} onMouseLeave = {this.fadeBack} id="contact" to='/contact'>Contact</Link>
        </nav>
        <nav className={"mobile " + this.state.mobIsOpen}>
          <span className="bars" onClick={this.openMobile}>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <nav id="middle-navigation">
            <h1><Link to='/'><img src={logo} alt="Arielle Berman" /></Link></h1>
            <h2>Casting {this.state.nameOfPage}</h2>
          </nav>
        </nav>
        <div className={"mobile " + this.state.mobileOpen}>
          <div>
          <Link onClick={this.state.removeFixed} id='face' to='/faces'>Faces</Link>
            <ul id="facesList" className={this.state.faceState}>
              {faceTitles}
            </ul>
            <small onClick={this.toggleFace}>View List</small>
          <Link onClick={this.state.removeFixed} id='comm' to='/commercial'>Commerical</Link>
            <ul id="commericalList" className={this.state.commState}>
              {commercialTitles}
            </ul>
            <small onClick={this.toggleComm}>View List</small>
          <Link onClick={this.state.removeFixed} id='edit' to='/editorial'>Editorial</Link>
            <ul id="editorialList" className={this.state.editState}>
              {editorialTitles}
            </ul>
            <small onClick={this.toggleEditorial}>View List</small>
            <div className="mobile-content">
              <h3> Contact </h3>
              <p>{contactInfo}</p>
              <p>{email}</p>
              <p>{instagram}</p>
              <p>{phone}</p>
            </div>
            <h3>Newsletter</h3>
            <div className="newsletter">
              <p className={this.state.showMessage}>Thank you for your subscribing. </p>
              <input className={`${this.state.showIn} ${this.state.error}`} onChange={this.handleChange} placeholder="Email Address" value={this.state.value} type="email" name=""  />
              <input className={this.state.showIn} onClick={this.updateMessage} type="submit" placeholder="submit"  value="Sign Up"/></div>
          </div>
        </div>
      </header>

    );
  }
}

export default Navigation;
