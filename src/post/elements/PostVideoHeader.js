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
            <section style={{backgroundColor: 'whitesmoke'}} className="slider">
                <video width="320" height="240" autoPlay muted={this.state.muted} loop nocontrols playsInline>
                    <source src={this.props.theVideoElement} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <SoundButton onClick={this.unMute}>Sound: {this.state.sound}</SoundButton>
                </section>
        );
    }
}

export default PostVideoHeader;