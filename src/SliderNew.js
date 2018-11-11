import React, { Component } from 'react';
import './App.css';
import Credits from './Credits';
import Creditsmob from './Mobilecred';
import {
  CSSTransitionGroup,
  TransitionGroup,
} from 'react-transition-group';

class SliderNew extends Component {
  render() {
    const next = this.props.theContent.map((name,index) =>{
      if (index < 4 && index === this.props.counter) {
        return (
          <div
            key={`${name.sys.id}`}
            style={{backgroundImage: 'url('+name.fields.banner.fields.file.url+')'}}></div>
        )
      } else {
        return null;
      }
    },this)

    const previous = this.props.theContent.map((name,index) =>{
      if (index < 4 && index === this.props.previousSlide) {
        return (
          <div
            key={`${name.sys.id}`}
            style={{backgroundImage: 'url('+name.fields.banner.fields.file.url+')'}}></div>
        )
      }
      else {
        return null;
      }
    },this)

    return (
      <section className="slider">
         <CSSTransitionGroup
            className='previous'
            transitionName="example"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppear={false}
            style={{zIndex: this.props.zIndexPrev}}
          >
            {previous}
        </CSSTransitionGroup>
        <CSSTransitionGroup
          className='next'
           transitionName="example"
           transitionEnterTimeout={1000}
           transitionLeaveTimeout={1000}
           transitionAppear={false}
           style={{zIndex: this.props.zIndexNext}}
          >
           {next}
       </CSSTransitionGroup>
        <nav>
          {this.props.theContent.map((name,index) =>{ if (index < 4) {
              return ( <Credits key={`${name.sys.id}`} dataNum={index} mouseOnCredit={this.props.hoverCredit} onLeaveCredit={this.props.mouseLeave} creditText={name} />
              )}
              else { return null; }
          }, this)}

          <div className="mobile">
            {this.props.theContent.map(function(name,index){ if (index < 4 && index === this.props.counter ||  index < 4 && index === this.props.previousSlide) {
                return (
                  <Creditsmob key={`${name.sys.id}`}
                    dataNum={this.props.numericalNum}
                    mouseOnCredit={this.props.hoverCredit}
                    creditText={this.props.theContent[this.props.counter]}
                    mobileSlider={this.props.mobileSlider}/>
                )}
                else { return null; }
            }, this)}

          </div>
        </nav>

      </section>
    );
  }
}

export default SliderNew;
