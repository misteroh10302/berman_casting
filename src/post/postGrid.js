import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { generateKey,removeSpacing } from '../utils/utils.js'
import styled, { css } from 'styled-components';

class PostGrid extends Component {
    state = {

    }
    render() {
        return (
            <section className="post-grid">
                {this.props.content.map((reg, i)=> {
                     let imageClass;
                     if (reg.fields.file.url.includes('mov') || reg.fields.file.url.includes('mp4')) {
                       return (
                         <div key={i} className={`horizontal-image ${this.props.screenType}`}>
                          <video src={reg.fields.file.url} controls></video>
                        </div>
                       )
                     } else {
                       let imHeight = parseInt(reg.fields.file.details.image.height, 10);
                       let imWidth = parseInt(reg.fields.file.details.image.width, 10);
                       if(imHeight>imWidth) {
                          imageClass = "vertical-image";
                       } else {
                         imageClass = "horizontal-image";
                       }
                       return <div key={i} className={`${imageClass} ${this.props.screenType}`}>
                         <div style={{backgroundImage: `url(${reg.fields.file.url})`}}></div>
                       </div>
                     }
                })}
            </section>
        );
    }
 
}

export default PostGrid;
