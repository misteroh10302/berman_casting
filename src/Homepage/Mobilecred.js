import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class Creditsmob extends Component {
  render() {
    let logoColor = this.props.creditText.fields.headerHomepageLogoColor;
    let textColor = this.props.creditText.fields.headerHompageTextColor;
    let creditColor = this.props.creditText.fields.homepageHeaderCreditColor;
    let dataPropNext = this.props.dataNum + 1;
    return (
        <span key={this.props.creditText.sys.id}>
          <div >
            <ReactMarkdown source={this.props.creditText.fields.postInformation} />
            <small><Link to={"/"+ this.props.creditText.fields.title}>VIEW MORE</Link></small>
          </div>
          <div className="slide-buttons mobile">
              <div className="buttons" onClick={() => this.props.mobileSlider(logoColor, textColor, creditColor, dataPropNext, "prev")}>&larr; </div>
              <div className="mobile"> {this.props.dataNum +1 } / 4 </div>
              <div className="buttons" onClick={() => this.props.mobileSlider(logoColor, textColor, creditColor, dataPropNext, "next")}> &rarr; 	 </div>
          </div>
        </span>
    );
  }
}

export default Creditsmob;
