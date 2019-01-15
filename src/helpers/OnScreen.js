import React, { Component } from 'react';
import '../App.css';
import styled, { css } from 'styled-components';

const ScreenWrapper = styled.div`
    visibility: ${props => props.onScreen};
    /* width: 50%; */
    /* height: 200px; */
    background-color: #eee;
    transition: 2s ease;
    img {
        opacity:0;
        transition: 2s ease;
    }
    ${ props => props.onScreen == "visible" && css`
        /* transform: rotate(45deg); */
        img {
            opacity: 1;
        }
  `};
  
`;

class OnScreen extends Component {
    state = {
        visibile: "hidden"
    }

    componentDidMount() {
        window.addEventListener('scroll', this.isOnScreen);
    }

    isOnScreen = () => {
        let windowScroll = window.scrollY - 590;
        let elementScroll =  !this.divElement ? 900 : this.divElement.offsetTop - this.divElement.clientHeight - 400;
        windowScroll >  elementScroll  ? this.setState({visibile: 'visible'}) :  null;
    }

    render() {
        return (
            <ScreenWrapper onScreen={this.state.visibile} ref={ (divElement) => this.divElement = divElement}>
              {this.props.children}

            </ScreenWrapper>
          );
    }
}


export default OnScreen;
