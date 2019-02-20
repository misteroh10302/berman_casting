import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router-dom'
import logo from '../Assets/berman.png';
import Footer from '../Footer/Footer';
import MobileContent from '../Contact/MobileContent'
import { generateKey,removeSpacing } from '../utils/utils.js'

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
    // window.removeEventListener('scroll',this.onScrollColor, false);
  }

  openMobile() {
    let pageScrollTop = window.scrollY;
    let nameOfPage = this.props.nameOfPage;
    let pageCategory =this.props.postClass;
    console.log(this.props.postClass);
    if (nameOfPage ===": commercial" || pageCategory ===": commercial") {
      this.setState({commState: "shown"})
    } else if (nameOfPage === ": faces" || pageCategory ===": faces")  {
      this.setState({faceState: "shown"})
    } else if (nameOfPage === ": editorial"  || pageCategory ===": editorial") {
      this.setState({editState: "shown"})
    }
    if(this.state.mobileOpen === "hidden") {
      this.setState({ mobileOpen: "showNav", mobIsOpen: 'mobOpen'})
      document.querySelector('body').classList.add('fix-background');
      this.setState({topPos: pageScrollTop })

    } else {
      this.setState({ mobileOpen: "hidden", mobIsOpen: 'closed'})
      document.querySelector('body').classList.remove('fix-background');
      window.scrollTo(0, this.state.topPos);
    }
  }


  onScrollColor(){
    let scrollHeight = window.innerHeight;
    let scrollPos = window.scrollY;
    let morePosts = this.props.scrollToPoint;

    if (scrollPos > scrollHeight - 60) {
      this.setState({ navColor: "black" })
    } else if (scrollPos < scrollHeight - 60) {
      this.setState({ navColor: "white" })
    }

    if (scrollPos > morePosts) {
      this.setState({ nameOfPage: this.props.postClass
      })
    } else if (scrollPos < morePosts) {
      this.setState({ nameOfPage: this.props.nameOfPage })
    }
  }

  toggleFace(event){
    if(this.state.faceState === "hidden") {
      this.setState({
        faceState: "shown",
      })
      event.target.innerHTML = "close";
    } else {
      this.setState({
        faceState: "hidden",
      })
      event.target.innerHTML = "view list";

    }
  }

  toggleComm(event){

    if(this.state.commState === "hidden") {
      this.setState({commState: "shown"})
      event.target.innerHTML = "close";
    } else {
      this.setState({commState: "hidden"  })
      event.target.innerHTML = "view list";

    }
  }

  toggleEditorial(event){
    if(this.state.editState === "hidden") {
      this.setState({editState: "shown"})
      event.target.innerHTML = "close";
    } else {
      this.setState({editState: "hidden"})
      event.target.innerHTML = "view list";

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
             return <li>   <Link key={generateKey(i)} to={'/project/'+removeSpacing(reg.fields.title)}> {reg.fields.title}</Link></li>;
           }
        })

       commercialTitles = this.props.titleContent.map(function(reg,i) {
          if (reg.fields.tag ==="commercial") {
            return <li>   <Link key={generateKey(i)} to={'/project/'+removeSpacing(reg.fields.title)}> {reg.fields.title}</Link></li>;
          }
       })

        editorialTitles = this.props.titleContent.map(function(reg,i) {
           if (reg.fields.tag ==="editorial") {
             return <li>   <Link key={generateKey(i)} to={'/project/'+removeSpacing(reg.fields.title)}> {reg.fields.title}</Link></li>;
           }
        })
      }


      let  contactInfo, email, instagram, phone;
      let contactObj = {
        contactInfo, email, instagram, phone
      }
       if (this.props.contactMobile === undefined) {
           contactObj.contactInfo = ''; contactObj.email  = ""; contactObj.instagram = ""; contactObj.phone = "";
       }else {
           contactObj.contactInfo = this.props.contactMobile[0].fields.entry;
           contactObj.email  = this.props.contactMobile[0].fields.email;
           contactObj.instagram = this.props.contactMobile[0].fields.instagram;
           contactObj.phone = this.props.contactMobile[0].fields.phoneNumber;

       }

    return (
      <header className={this.state.navColor + " nav-header"}>
        <nav id="left-navigation" className="desktop">
          <Link onMouseOver={this.fadeOut} onMouseLeave = {this.fadeBack} id='face' to='/project/faces'>
              Faces
          </Link>
          <Link onMouseOver={this.fadeOut} onMouseLeave = {this.fadeBack} id='comm' to='/project-category/commercial'>
              Commercial
          </Link>
          <Link onMouseOver={this.fadeOut} onMouseLeave = {this.fadeBack} id='edit' to='/project-category/editorial'>
              Editorial
          </Link>
        </nav>
        <nav id="middle-navigation" className="desktop">
          <h1><Link to='/'><img src={logo} alt="Arielle Berman" /> </Link></h1>
          <h2>Casting </h2>
        </nav>
        <nav id="right-navigation" className="desktop">
          <Link 
             onMouseOver={this.fadeOut} 
             onMouseLeave = {this.fadeBack} 
           
             id="contact" to='/contact'>Contact</Link>
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
           <Link onClick={this.state.removeFixed} id='face' to='/project/faces'>Faces</Link>
            <ul id="facesList" className={this.state.faceState}>
              {faceTitles}
            </ul>
            <small 
            // onClick={this.toggleFace}
            >
            {/* View List */}
            </small>
            <Link onClick={this.state.removeFixed} id='comm' to='/project-category/commercial'>Commercial</Link>
              <ul id="commericalList" className={this.state.commState}>
                {commercialTitles}
              </ul>
            <small onClick={this.toggleComm}>View List</small>
          <Link onClick={this.state.removeFixed} id='edit' to='/project-category/editorial'>Editorial</Link>
            <ul id="editorialList" className={this.state.editState}>
              {editorialTitles}
            </ul>
            <small onClick={this.toggleEditorial}>View List</small>
            <MobileContent mobileContact={contactObj}/>
            <h3 className="news-title">Newsletter</h3>
            <div className="newsletter">
              <p className={this.state.showMessage}>Thank you for subscribing. </p>
              <input className={`${this.state.showIn} ${this.state.error}`} onChange={this.handleChange} placeholder="Email Address" value={this.state.value} type="email" name=""  />
              <input className={this.state.showIn} onClick={this.updateMessage} type="submit" placeholder="submit"  value="Sign Up"/></div>
          </div>

          <div className="site__credit">
                  <p>Design by <a href="http://zyxt.info/" target="_blank">Zyxt</a></p>
                  <p>Development by <a href="http://madeline-omoore.com/#/" target="_blank">Madeline O'Moore</a></p>
                </div>
            <Footer />
        </div>

      </header>

    );
  }

}

export default Navigation;
