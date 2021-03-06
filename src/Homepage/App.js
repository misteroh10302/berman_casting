import React, { Component } from 'react';
import Navigation from '../Header/Nav';
import '../App.css';
import Footer from '../Footer/Footer.js';
import SliderNew from '../SliderNew.js';
import Homegrid from './Homegrid.js';
import SliderHome from './SliderHome.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      scrollLock: "lock__off",
      titleContent: null,
      numericalNum: 0,
      theCurrentSlide: 0
    }
    this.onScrollLock = this.onScrollLock.bind(this);
  }

  componentDidMount() {
      window.scrollTo(0, 0);
      // window.addEventListener('scroll',this.onScrollLock);
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll',this.onScrollLock);
  }

  onScrollLock() {
    let scrollHeight = window.innerHeight;
    let scrollPos = window.scrollY;
    if (scrollPos > scrollHeight && (this.state.scrollLock === "lock__off")) {
      this.setState({ scrollLock: "lock__on" })
      window.scrollTo(0, 0);
    }
  }

  updateHeader = (theCurrentSlide) => {
    this.setState({theCurrentSlide})
  }

  render() {
    let homePageLogo, homePageText, homePageCredit,homePageContact;
    
    if (this.props.gridContents[0] ) {
      let gridContent = this.props.gridContents[this.state.theCurrentSlide];
      homePageLogo = gridContent.fields.headerHomepageLogoColor;
      homePageText = gridContent.fields.headerHompageTextColor;
      homePageCredit = gridContent.fields.homepageHeaderCreditColor;
      if (gridContent.fields.contactColor) {
        homePageContact = gridContent.fields.contactColor;
      }
      

     } else {
      homePageLogo, homePageText, homePageCredit, homePageContact = "white";
    }

    return (
      <div className={`App ${this.state.scrollLock}`} id="home"   
      data-logo={homePageLogo}
      data-text={homePageText}
      data-credit={homePageCredit}
      data-contact={homePageContact}>
      <Navigation
                contactMobile={this.props.contactMobile}
                titleContent={this.props.titleContent} />
        <header className={`App-header ${this.state.currentSlide} ${this.state.previousActive}`} ref={(item) => {this.header = item}}
          
            >
              
                <SliderHome updateHeader={this.updateHeader} theContent={this.props.gridContents} />
        </header>
        <section>
          <Homegrid
              theContent={this.props.gridContents}
              pageName={'homepage'}/>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
