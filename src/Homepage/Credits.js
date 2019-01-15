import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class Credits extends Component {
  render() {
    let logoColor, textColor, creditColor;
    let credit = this.props.creditText;
    logoColor = credit.fields.headerHomepageLogoColor;
    textColor = credit.fields.headerHompageTextColor;
    creditColor = credit.fields.homepageHeaderCreditColor;
    return (
        <span
          key={credit.sys.id}
            onMouseLeave={() => this.props.onLeaveCredit(this.props.dataNum)}
            onMouseEnter={() => this.props.mouseOnCredit(logoColor, textColor, creditColor, this.props.dataNum)}>
            <div className={`desktop`}  >
              <ReactMarkdown source={credit.fields.postInformation} />
              <small><Link to={"/"+ credit.fields.title}>VIEW MORE</Link></small>
            </div>
        </span>
    );
  }
}

export default Credits;
