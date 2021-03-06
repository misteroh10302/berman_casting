import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import ReactMarkdown from 'react-markdown';
// import Creditsmob from './Mobilecred';
import { generateKey,removeSpacing } from '../utils/utils.js'
import styled from 'styled-components';
import ReactSwipeEvents from 'react-swipe-events'
import ImageLoaderBackground from '../post/helper/ImageLoaderBackground';


const CreditWith = styled.div`
  width: 25%;
  margin-right: 15px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;


class SliderHome extends Component {
  state = {
      currentSlide: 0,
      previousSlide: 1
  }

  updateSlider = (currentSlide) => {
    if (this.state.currentSlide === currentSlide) {
      return;
    } else {
      this.setState( prevState => ({
        currentSlide,
        previousSlide: prevState.currentSlide
      }))
      this.props.updateHeader(currentSlide)
    }
     
  }

  render() {
    const randomNumer = Math.floor(Math.random() * Math.floor(this.props.theContent.length));
    const previous = this.props.theContent.map((name,index) =>{
      if (index === randomNumer) {
        if (name.fields.banner && name.fields.banner.fields.file.url.includes('video')) {
          return (
            <div className="wrapper-for-video">
              <video key={`${generateKey(name.sys.id)}`} playsInline width="320" height="240" autoPlay muted loop nocontrols='true' className={(index === this.state.currentSlide ? "current" : index === this.state.previousSlide ? "previous"  : ""  )}>
                <source src={name.fields.banner.fields.file.url} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
            </div>
          )
        } else if (name.fields.banner) {
          return (
            <div key={`${generateKey(name.sys.id)}`} className={(index === this.state.currentSlide ? "current" : index === this.state.previousSlide ? "previous"  : ""  ) }
              style={{backgroundImage: 'url('+name.fields.banner.fields.file.url+'?w=1900)'}}></div>
          )
        }

      }
      else {return null; }
    });

    const credits = this.props.theContent.map((credit,index) =>
    index === randomNumer ? <CreditWith key={index} 
              // onMouseOver={event => this.updateSlider(index)} 
              className={(this.state.currentSlide === index ? 'current__title' : 'prev__title')}>
            <div className={`desktop hover-${credit.fields.homepageHeaderCreditColor}`} >
              <ReactMarkdown source={credit.fields.postInformation} />
              <small><Link to={"/project/"+removeSpacing(credit.fields.title)}>VIEW MORE</Link></small>
            </div>
        </CreditWith> :  null
    );

    const creditsMobile = this.props.theContent.map((credit,index) =>
    index === randomNumer ? <div key={index} 
      
          className={(index === randomNumer ? "mobile__credit__current" : "mobile__credit__other")} 
          >
          <ReactMarkdown source={credit.fields.postInformation} />
          <small><Link to={"/project/"+removeSpacing(credit.fields.title)}>VIEW MORE</Link></small>
      </div> :  null
    );
    return (
      <ReactSwipeEvents 
      // onSwipedLeft={(event) => this.updateSlider(this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 3 )}
      // onSwipedRight={(event) => this.updateSlider(this.state.currentSlide < 3 ? this.state.currentSlide + 1 : 0 )}
      >
      <section className="slider" >
       {previous}
       <nav> {credits} </nav>
       <div className="mobile___credits">
          {creditsMobile}
       </div>
       {/* <div className="slide-buttons mobile">
           <div className="buttons" onClick={(event) => this.updateSlider(this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 3 )}>&larr; </div>
           <div className="mobile"> {this.state.currentSlide + 1 } / 4 </div>
           <div className="buttons" onClick={(event) => this.updateSlider(this.state.currentSlide < 3 ? this.state.currentSlide + 1 : 0 )}> &rarr; 	 </div>
       </div> */}
      </section>
      </ReactSwipeEvents>
    );
  }
}


export default SliderHome;
