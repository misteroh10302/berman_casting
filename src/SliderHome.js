import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import ReactMarkdown from 'react-markdown';
import Creditsmob from './Mobilecred';
import { generateKey,removeSpacing } from './utils/utils.js'

class SliderHome extends Component {
  state = {
      currentSlide: 0,
      previousSlide: 1
  }

  updateSlider = (currentSlide) => {
      this.setState(prevState => ({
        currentSlide,
        previousSlide: prevState.currentSlide
      }))
      this.props.updateHeader(currentSlide)
  }

  render() {
    const previous = this.props.theContent.map((name,index) =>{
      console.log(name.fields);
      if (index < 4) {
        if (name.fields.banner && name.fields.banner.fields.file.url.includes('video')) {
          return (
            <video key={`${name.sys.id}`} width="320" height="240" autoPlay muted loop nocontrols className={(index === this.state.currentSlide ? "current" : index === this.state.previousSlide ? "previous"  : ""  )}>
              <source src={name.fields.banner.fields.file.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          )
        } else if (name.fields.banner) {
          return (
            <div key={`${name.sys.id}`} className={(index === this.state.currentSlide ? "current" : index === this.state.previousSlide ? "previous"  : ""  ) }
              style={{backgroundImage: 'url('+name.fields.banner.fields.file.url+')'}}></div>
          )
        }

      }
      else {return null; }
    });

    const credits = this.props.theContent.map((credit,index) =>
      index < 4 ? <div onMouseOver={event => this.updateSlider(index)} className={(this.state.currentSlide === index ? 'current__title' : 'prev__title')}>
            <div className={`desktop hover-${credit.fields.homepageHeaderCreditColor}`} >
              <ReactMarkdown source={credit.fields.postInformation} />
              <small><Link to={"/"+removeSpacing(credit.fields.title)}>VIEW MORE</Link></small>
            </div>
        </div> :  null
    );

    const creditsMobile = this.props.theContent.map((credit,index) =>
      index < 4 ? <div className={(index === this.state.currentSlide ? "mobile__credit__current" : "mobile__credit__other")} >
          <ReactMarkdown source={credit.fields.postInformation} />
          <small><Link to={"/"+removeSpacing(credit.fields.title)}>VIEW MORE</Link></small>
      </div> :  null
    );
    return (
      <section className="slider">
       {previous}
       <nav> {credits} </nav>
       <div className="mobile___credits">
          {creditsMobile}
       </div>
       <div className="slide-buttons mobile">
           <div className="buttons" onClick={(event) => this.updateSlider(this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 3 )}>&larr; </div>
           <div className="mobile"> {this.state.currentSlide + 1 } / 4 </div>
           <div className="buttons" onClick={(event) => this.updateSlider(this.state.currentSlide < 3 ? this.state.currentSlide + 1 : 0 )}> &rarr; 	 </div>
       </div>
      </section>
    );
  }
}


export default SliderHome;
