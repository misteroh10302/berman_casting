import React, { Component } from 'react';
import Navigation from './Nav';
import './App.css';
import Footer from './Footer.js';
import SliderNew from './SliderNew.js';
import Homegrid from './Homegrid.js';
import SliderHome from './SliderHome.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      scrollLock: "lock__off",
      previousActive: "zero",
      currentSlide: 'zero',
      zIndex: 1,
      counter: 0,
      previousSlide: 0,
      titleContent: null,
      slideTracker: true,
      zIndexNext: 1,
      zIndexPrev: 0,
      numericalNum: 0,
      theCurrentSlide: 0
    }
    this.onScrollLock = this.onScrollLock.bind(this);
    // this.hoverCredit = this.hoverCredit.bind(this);
    // this.mobileSlider = this.mobileSlider.bind(this);
    // this.call = this.call.bind(this);
    // this.leaveCredit = this.leaveCredit.bind(this)
  }

  componentWillMount() {
      window.scrollTo(0, 0);
      window.addEventListener('scroll',this.onScrollLock);
  }

  // mobileSlider(logo, credit, text, activeNum, direction){
  //   let theCurrentSlide = this.state.currentSlide;
  //   let numericalNum, previousSlide;
  //   if( direction === "next") {
  //     if (theCurrentSlide === 1  || theCurrentSlide === "one") {
  //       activeNum = "two";
  //       numericalNum = 2;
  //       previousSlide = 1;
  //     } else if (theCurrentSlide === 2 || theCurrentSlide === "two") {
  //       activeNum = "three";
  //       numericalNum = 3;
  //       previousSlide = 2;
  //     } else if ( theCurrentSlide === 3  || theCurrentSlide === "three") {
  //       activeNum = "zero";
  //       numericalNum = 0;
  //       previousSlide = 3;
  //     } else {
  //       activeNum = "one";
  //       numericalNum = 1;
  //       previousSlide = 0;
  //     }
  //   } else if (direction === "prev") {
  //     if (theCurrentSlide === 1  || theCurrentSlide === "one") {
  //       activeNum = "zero";
  //       numericalNum = 0;
  //       previousSlide = 1;
  //     } else if (theCurrentSlide === 2 || theCurrentSlide === "two") {
  //       activeNum = "one";
  //       numericalNum = 1;
  //       previousSlide = 2;
  //     } else if ( theCurrentSlide === 3  || theCurrentSlide === "three") {
  //       activeNum = "two";
  //       numericalNum = 2;
  //       previousSlide = 3;
  //     } else {
  //       activeNum = "three";
  //       numericalNum = 3;
  //       previousSlide = 0;
  //     }
  //   }
  //
  //   if (this.state.slideTracker === true) {
  //     this.setState({
  //       numericalNum: numericalNum,
  //       currentSlide: activeNum,
  //       counter: numericalNum,
  //       slideTracker: false,
  //       zIndexPrev: 0,
  //       zIndexNext: 1
  //    })
  //  } else {
  //    this.setState({
  //      numericalNum: numericalNum,
  //     currentSlide: activeNum,
  //     previousSlide: numericalNum,
  //     slideTracker: true,
  //     zIndexPrev: 1,
  //     zIndexNext: 0
  //   })
  //
  //  }
    // this.setState({
    //   currentSlide: activeNum,
    //   counter: numericalNum,
    //   previousSlide
    // })
  // }
  //
  // hoverCredit(logo, credit, text, activeNum) {
  //   this.header.attributes[1].value = logo;
  //   this.header.attributes[3].value = credit;
  //   this.header.attributes[2].value = text;
  //   this.call(activeNum);
  // }

  // leaveCredit(slideNumber)  {
  //   // this.setState({
  //   //   previousSlide: slideNumber
  //   // })
  // }

  // call(activeNum) {
  //   let numericalNum = activeNum;
  //   if (activeNum === 1) {
  //     activeNum = "one"
  //   } else if (activeNum === 2) {
  //     activeNum = "two"
  //   } else if ( activeNum === 3) {
  //     activeNum = "three";
  //   } else {
  //     activeNum = "zero"
  //   }
  //
  //   if (this.state.slideTracker === true) {
  //     this.setState({
  //       currentSlide: activeNum,
  //       counter: numericalNum,
  //       slideTracker: false,
  //       zIndexPrev: 0,
  //       zIndexNext: 1
  //    })
  //  } else {
  //    this.setState({
  //     currentSlide: activeNum,
  //     previousSlide: numericalNum,
  //     slideTracker: true,
  //     zIndexPrev: 1,
  //     zIndexNext: 0
  //   })
  //
  //  }
  //
  // }

  onScrollLock() {
    let scrollHeight = window.innerHeight;
    let scrollPos = window.scrollY;
    if (scrollPos > scrollHeight && (this.state.scrollLock === "lock__off")) {
      this.setState({ scrollLock: "lock__on" })
      window.scrollTo(0, 0);
    }
  }

  updateHeader = (theCurrentSlide) => {
    console.log(theCurrentSlide)
    this.setState({theCurrentSlide})
  }

  render() {
    let homePageLogo, homePageText, homePageCredit;
    if (this.props.gridContents[0] ) {
      homePageLogo = this.props.gridContents[this.state.theCurrentSlide].fields.headerHomepageLogoColor;
      homePageText = this.props.gridContents[this.state.theCurrentSlide].fields.headerHompageTextColor;
      homePageCredit = this.props.gridContents[this.state.theCurrentSlide].fields.homepageHeaderCreditColor;
    } else {
      homePageLogo, homePageText, homePageCredit = "white";
    }

    // <SliderNew
    //   hoverCredit={this.hoverCredit}
    //   theContent={this.props.gridContents}
    //   counter={this.state.counter}
    //   numericalNum={this.state.numericalNum}
    //   previousSlide={this.state.previousSlide}
    //   mobileSlider={this.mobileSlider}
    //   mouseLeave={this.leaveCredit}
    //   activeSlide={this.state.currentSlide}
    //   zIndexNext={this.state.zIndexNext}
    //   zIndexPrev={this.state.zIndexPrev}
    // />




    return (
      <div className={`App ${this.state.scrollLock}`} id="home">
        <header className={`App-header ${this.state.currentSlide} ${this.state.previousActive}`} ref={(item) => {this.header = item}}
            data-logo={homePageLogo}
            data-text={homePageText}
            data-credit={homePageCredit}>
              <Navigation
                contactMobile={this.props.contactMobile}
                titleContent={this.props.titleContent} />
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
