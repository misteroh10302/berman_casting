import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Credits from './Credits';
import Creditsmob from './Mobilecred';
import {
  CSSTransitionGroup,
  TransitionGroup,
} from 'react-transition-group';
import uuid from 'uuid';


class SliderNew extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidUpdate() {

  }


  render() {
    let activeClass = (this.props.activeSlide === "one") ? (activeClass = 1) : (this.props.activeSlide === "two") ? (activeClass = 2) : (this.props.activeSlide === "three") ? (activeClass = 3) : (activeClass = 0);
    const items = this.props.theContent.map(function(name,index){
      if (index < 4 && index === this.props.counter) {
        return (
          <div
            key={`${name.sys.id}`}
            style={{backgroundImage: 'url('+name.fields.banner.fields.file.url+')'}}></div>
        )
      }
    },this)

    const previous = this.props.theContent.map(function(name,index){
      if (index < 4 && index === this.props.previousSlide) {
        return (
          <div
            key={`${name.sys.id}`}
            style={{backgroundImage: 'url('+name.fields.banner.fields.file.url+')'}}></div>
        )
      }
    },this)

    return (
      <section className="slider">

           <CSSTransitionGroup
              className='previous'
              transitionName="previous"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={4000}
              transitionAppear={false}>
              {previous}
          </CSSTransitionGroup>
        <CSSTransitionGroup
          className='next'
           transitionName="example"
           transitionEnterTimeout={1000}
           transitionLeaveTimeout={1000}t
           transitionAppear={false}
           >
           {items}
       </CSSTransitionGroup>

        <nav>
          {this.props.theContent.map(function(name,index){
            if (index < 4) {
              return (
                <Credits
                  key={`${name.sys.id}`}
                  dataNum={index}
                  mouseOnCredit={this.props.hoverCredit}
                  onLeaveCredit={this.props.mouseLeave}
                  creditText={name} />
              )
            }
          }, this)}
          <div className="mobile">
            {this.props.theContent.map(function(name,index){
              if (index < 4) {
                return (
                  <Creditsmob
                    key={`${name.sys.id}`}
                    dataNum={index}
                    mouseOnCredit={this.props.hoverCredit}
                    creditText={name}
                    mobileSlider={this.props.mobileSlider}/>
                )
              }
            }, this)}

          </div>
        </nav>

      </section>
    );
  }
}

export default SliderNew;
