import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class Slider extends Component {
  constructor(props){
    super(props);
    this.state = {
      moduleOne: "onScreen",
      moduleTwo: "offScreen",
      moduleThree: "offScreen",
      moduleFour: "offScreen",
      currentOnScreen: "moduleOne",
      mobileSlideNumber: "moduleOneMobile",
      counter: 0
    }

    this.oneClicked = this.oneClicked.bind(this);
    this.twoClicked = this.twoClicked.bind(this);
    this.threeClicked = this.threeClicked.bind(this);
    this.fourClicked = this.fourClicked.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  componentDidMount() {

  }

  timeOut = (currentItem) => {

  }


  nextSlide = () => {
      let updateCounter = this.state.counter;
      if (updateCounter === 3 ?  updateCounter = 0 : updateCounter++);
      let currentShown = this.state.currentOnScreen;
      let shiftOnScreen;
      let mobileMod;
       if( currentShown === "moduleOne") {
           shiftOnScreen = "moduleTwo";
           mobileMod = "moduleTwoMobile"
       } else if (currentShown === "moduleTwo") {
           shiftOnScreen = "moduleThree";
           mobileMod = "moduleThreeMobile"
        }else if (currentShown === "moduleThree") {
            shiftOnScreen = "moduleFour";
            mobileMod = "moduleFourMobile"
         }else if (currentShown === "moduleFour") {
             shiftOnScreen = "moduleOne";
             mobileMod = "moduleOneMobile"
        }
       this.setState({
         [currentShown]: "offScreen shiftLeft",
         [shiftOnScreen]: "shiftOn onScreen",
         currentOnScreen: shiftOnScreen,
         mobileSlideNumber: mobileMod
       });
       setTimeout(function() { this.setState({[currentShown]: 'offScreen'}); }.bind(this),1000 );
  }

  previousSlide = () => {
      let updateCounter = this.state.counter;
      if (updateCounter === 3 ? updateCounter = 0 : updateCounter++ );

      let currentShown = this.state.currentOnScreen;
      let shiftOnScreen;
      let mobileMod;
       if(currentShown === "moduleOne") {
           shiftOnScreen = "moduleFour";
           mobileMod = "moduleFourMobile"
       } else if (currentShown === "moduleTwo") {
           shiftOnScreen = "moduleOne";
           mobileMod = "moduleOneMobile"
        }else if (currentShown === "moduleThree") {
            shiftOnScreen = "moduleTwo";
            mobileMod = "moduleTwoMobile"
         }else if (currentShown === "moduleFour") {
             shiftOnScreen = "moduleThree";
             mobileMod = "moduleThreeMobile"
        }

       this.setState({
         [currentShown]: "offScreen shiftLeft",
         [shiftOnScreen]: "shiftOn onScreen",
         currentOnScreen: shiftOnScreen,
         mobileSlideNumber: mobileMod
       });

       setTimeout(
           function() {
               this.setState({[currentShown]: 'offScreen'});
           }
           .bind(this),
           1000
       );


  }

  oneClicked = (e) => {
    let currentShown = this.state.currentOnScreen;
    // if current on screen is equal to the number return
    if (currentShown === "moduleOne") {
      return;
    } else {
      this.setState({
        [currentShown]: "offScreen shiftLeft",
        moduleOne: "shiftOn onScreen",
        currentOnScreen: "moduleOne",
        mobileSlideNumber: "moduleOneMobile"
      });

      setTimeout(
          function() {
              this.setState({[currentShown]: 'offScreen'});
          }
          .bind(this),
          1000
      );
    }

  }

  twoClicked = (e) => {
    let currentShown = this.state.currentOnScreen;

    if (currentShown === "moduleTwo") {
      return;
    } else {
      this.setState({
        [currentShown]: "offScreen shiftLeft",
        moduleTwo: "shiftOn onScreen",
        currentOnScreen: "moduleTwo",
        mobileSlideNumber: "moduleTwoMobile"
      });

      setTimeout(
          function() {
              this.setState({[currentShown]: 'offScreen'});
          }
          .bind(this),
          1000
      );
    }
  }

  threeClicked = (e) => {
      let currentShown = this.state.currentOnScreen;
      if (currentShown === "moduleThree") {
        return;
      } else {
        this.setState({
          [currentShown]: "offScreen shiftLeft",
          moduleThree: "shiftOn onScreen",
          currentOnScreen: "moduleThree",
          mobileSlideNumber: "moduleThreeMobile"
        });
        setTimeout(
            function() {
                this.setState({[currentShown]: 'offScreen'});
            }
            .bind(this),
            1000
        );
      }

  }

  fourClicked = (e) => {
    let currentShown = this.state.currentOnScreen;
    if (currentShown === "moduleFour") {
      return;
    } else {
      this.setState({
        [currentShown]: "offScreen shiftLeft",
        moduleFour: "shiftOn onScreen",
        currentOnScreen: "moduleFour",
        mobileSlideNumber: "moduleFourMobile"
      });
      setTimeout(
          function() {
              this.setState({[currentShown]: 'offScreen'});
          }
          .bind(this),
          1000
      );
    }

  }
  render() {
    let theSliderText =[];
    let theSliderElement = [];
    let theContentProp = this.props.theContent;

    // if the length of the post array is 0 return
    if(theContentProp.length === 0) {

    } else {
      let functionName;
      let theId;
      let theClassName;
      let theVideoElement;
      for( let i=0; i < 4; i++) {
        // if its equal to one
        if (i === 0) {
          functionName = this.oneClicked;
          theId = "one";
          theClassName = this.state.moduleOne;
        } else if (i === 1) {
            functionName = this.twoClicked;
            theId = "two";
            theClassName = this.state.moduleTwo;
        } else if (i === 2) {
          functionName = this.threeClicked;
          theId = "three";
          theClassName = this.state.moduleThree;
        } else if (i === 3){
          functionName = this.fourClicked;
          theId = "four";
          theClassName = this.state.moduleFour;
        }
        theSliderText.push(
          <span id={i} className={this.state.mobileSlideNumber}>
            <div className={`${i} desktop`} onMouseOver={functionName} >
              <ReactMarkdown source={theContentProp[i].fields.postInformation} />
              <small><Link to={"/"+ theContentProp[i].fields.title}>VIEW MORE</Link></small>
            </div>
            <div onClick={functionName} className={`mobile ${this.state.mobileSlideNumber} ${i}`}>
              <ReactMarkdown source={theContentProp[i].fields.postInformation} />
              <small><Link to={"/"+ theContentProp[i].fields.title}>VIEW MORE</Link></small>
            </div>
            <div className="slide-buttons mobile">
                <div className="buttons" onClick={this.previousSlide}>&larr; </div>
                <div className="mobile"> {i+1} / 4 </div>
                <div className="buttons" onClick={this.nextSlide}> &rarr; 	 </div>
            </div>
          </span>
        )

        // see if the background image is vertical
        let imageClass = i;
        if (theContentProp[i].fields.banner.fields.file.details.image !== undefined) {
          let imHeight = parseInt(theContentProp[i].fields.banner.fields.file.details.image.height, 10);
          let imWidth = parseInt(theContentProp[i].fields.banner.fields.file.details.image.width, 10);
          let logoColor = theContentProp[i].fields.headerHomepageLogoColor;
          if(imHeight > imWidth ? imageClass = "vertical-image" : imageClass = "horizontal-image") ;
          theSliderElement.push(
            <div id={theId} data-logo={`${logoColor}`} className={`${theClassName} ${imageClass}`} style={{backgroundImage: 'url('+theContentProp[i].fields.banner.fields.file.url+')'}}>
            </div>
          )
          console.log('hello')
        } else {
          // if the image is actually a mov
          theVideoElement = theContentProp[i].fields.banner.fields.file.url;
          theSliderElement.push(
            <div id={theId} className={`${theClassName} ${imageClass} videoSlider`} style={{backgroundImage: 'url('+theContentProp[i].fields.banner.fields.file.url+')'}}>
                  <video width="320" height="240" autoPlay muted loop nocontrols>
                    <source src={theVideoElement} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
            </div>
          )
        }


      }
    }
    return (
            <section className="slider">
              {theSliderElement}
              <nav>
                {theSliderText}
              </nav>
            </section>
    );
  }
}

export default Slider;
