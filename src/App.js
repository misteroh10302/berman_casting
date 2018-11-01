import React, { Component } from 'react';
import Navigation from './Nav';
import './App.css';
import Footer from './Footer.js';
import SliderNew from './SliderNew.js';
import Homegrid from './Homegrid.js';
import { CSSTransitionGroup } from 'react-transition-group' // ES6


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      scrollLock: "lock__off",
      previousActive: "zero",
      currentSlide: 'zero',
      zIndex: 1,
      counter: 0,
      previousSlide: 0
    }
    this.onScrollLock = this.onScrollLock.bind(this);
    this.hoverCredit = this.hoverCredit.bind(this);
    this.mobileSlider = this.mobileSlider.bind(this);
    this.call = this.call.bind(this);
    this.leaveCredit = this.leaveCredit.bind(this)
  }

  componentWillMount() {
      window.scrollTo(0, 0);
      window.addEventListener('scroll',this.onScrollLock);
  }

  componentDidMount() {
  }

  mobileSlider(logo, credit, text, activeNum, direction){
    let theCurrentSlide = this.state.currentSlide;

    if( direction === "next") {
      if (theCurrentSlide === 1  || theCurrentSlide === "one") {
        activeNum = "two"
      } else if (theCurrentSlide === 2 || theCurrentSlide === "two") {
        activeNum = "three"
      } else if ( theCurrentSlide === 3  || theCurrentSlide === "three") {
        activeNum = "zero";
      } else {
        activeNum = "one"
      }
    } else if (direction === "prev") {
      if (theCurrentSlide === 1  || theCurrentSlide === "one") {
        activeNum = "zero"
      } else if (theCurrentSlide === 2 || theCurrentSlide === "two") {
        activeNum = "one"
      } else if ( theCurrentSlide === 3  || theCurrentSlide === "three") {
        activeNum = "two";
      } else {
        activeNum = "three"
      }
    }


    this.setState({
      currentSlide: activeNum
    })
  }

  hoverCredit(logo, credit, text, activeNum) {
    this.header.attributes[1].value = logo;
    this.header.attributes[3].value = credit;
    this.header.attributes[2].value = text;
    this.call(activeNum);
  }

  leaveCredit(slideNumber)  {
    console.log(this.state.counter,slideNumber)
    this.setState({
      previousSlide: slideNumber
    })
  }

  call(activeNum) {
    let numericalNum = activeNum;
    if (activeNum === 1) {
      activeNum = "one"
    } else if (activeNum === 2) {
      activeNum = "two"
    } else if ( activeNum === 3) {
      activeNum = "three";
    } else {
      activeNum = "zero"
    }

    this.setState({
      currentSlide: activeNum,
      counter: numericalNum
    })
  }

  onScrollLock() {
    let scrollHeight = window.innerHeight;
    let scrollPos = window.scrollY;
    if (scrollPos > scrollHeight && (this.state.scrollLock === "lock__off")) {
      this.setState({
        scrollLock: "lock__on"
      })
      window.scrollTo(0, 0);
    }
  }



  render() {
    let homePageLogo, homePageText, homePageCredit;
    if (this.props.gridContents[0] ) {
      homePageLogo = this.props.gridContents[0].fields.headerHomepageLogoColor;
      homePageText = this.props.gridContents[0].fields.headerHompageTextColor;
      homePageCredit = this.props.gridContents[0].fields.homepageHeaderCreditColor;
    } else {
      homePageLogo, homePageText, homePageCredit = "white";
    }

    return (
      <div className={`App ${this.state.scrollLock}`} id="home">
        <header className={`App-header ${this.state.currentSlide} ${this.state.previousActive}`} ref={(item) => {this.header = item}}
            data-logo={homePageLogo}
            data-text={homePageText}
            data-credit={homePageCredit}
            >
              <Navigation
                contactMobile={this.props.contactMobile}
                titleContent={this.props.titleContent} />

              <SliderNew
                hoverCredit={this.hoverCredit}
                theContent={this.props.gridContents}
                counter={this.state.counter}
                previousSlide={this.state.previousSlide}
                mobileSlider={this.mobileSlider}
                mouseLeave={this.leaveCredit}
                activeSlide={this.state.currentSlide}
                zIndex={this.state.zIndex}
              />

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
