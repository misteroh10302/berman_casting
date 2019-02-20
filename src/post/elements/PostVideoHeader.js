import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const SoundButton = styled.button`
    background-color: transparent;
    color:white;
    position: fixed;
    right: 40px;
    bottom: 30px;
    border:0;
    text-transform: uppercase;
    font-family: 'BC', sans-serif;
    font-size: 13px;
    line-height: 15px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity .25s ease;
    &:focus {
        outline: white;
    }
    &:hover {
        opacity:1;
    }
    @media screen and (max-width: 850px){
        display: none;
    }
`;
class PostVideoHeader extends Component {
    state = {
        sound: 'off',
        muted: true
    }

  

    componentDidMount() {
        window.addEventListener('scroll', this.soundOff);
    }

    soundOff = () => {
        let scrollTop = window.scrollY;
        let windowHeight = window.innerHeight;
        
        if (scrollTop > windowHeight) {
            // this.setState({
            //     sound: 'off',
            //     muted: true
            // });
            if (this.videoElement) {
                console.log(  this.videoElement.autoplay);
                this.videoElement.volume = this.videoElement.volume > .5 ? this.videoElement.volume - .25 : .25;
                setTimeout(() => {
                    this.muteVideo();
                },250)
            }
           
        //   this.divElement[0].volume = 0.5;
        }
       
    }

    muteVideo = () => {
        this.state.sound = 'off';
        this.state.muted = true;
        this.setState(this.state);
    }

    unMute = () => {
        this.state.sound === "off" ?
        this.setState({
            sound: 'on',
            muted: false
        }) :
        this.setState({
            sound: 'off',
            muted: true
        });

    }
    render() {
        return (
            <section style={{backgroundColor: 'black'}} className="slider wrapper-for-video">
                <video width="320" height="240" autoPlay muted={this.state.muted} loop nocontrols playsInline  ref={ (videoElement) => this.videoElement = videoElement}>
                    <source src={this.props.theVideoElement} type="video/mp4" poster="https://addpipe.com/sample_vid/poster.png"/>
                        Your browser does not support the video tag.
                    </video>
                    <SoundButton onClick={this.unMute}>Sound: {this.state.sound}</SoundButton>
                </section>
        );
    }
      
}

export default PostVideoHeader;