import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class Credits extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let logoColor, textColor, creditColor;
    logoColor = this.props.creditText.fields.headerHomepageLogoColor;
    textColor = this.props.creditText.fields.headerHompageTextColor;
    creditColor = this.props.creditText.fields.homepageHeaderCreditColor;
    return (
        <span
          key={this.props.creditText.sys.id}
            onMouseLeave={() => this.props.onLeaveCredit(this.props.dataNum)}
            onMouseEnter={() => this.props.mouseOnCredit(logoColor, textColor, creditColor, this.props.dataNum)}>
            <div className={`desktop`}  >
              <ReactMarkdown source={this.props.creditText.fields.postInformation} />
              <small><Link to={"/"+ this.props.creditText.fields.title}>VIEW MORE</Link></small>
            </div>
        </span>
    );
  }
}

export default Credits;
