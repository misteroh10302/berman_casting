import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { generateKey,removeSpacing } from '../utils/utils.js'
import styled, { css } from 'styled-components';
import ImageLoader from './elements/ImageLoader';
import LazyLoad from 'react-lazyload';
import { CSSTransitionGroup } from 'react-transition-group';
import ImageLoaderBackground from './helper/ImageLoaderBackground';

const Modal = styled.div`
  display: ${props => props.open};
  position: fixed;
  top: 0;
  left:0;
  right:0;
  z-index:9;
  background-color:#fffffff5;
  height: 100vh;
  width: 100vw !important;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    padding-top: 118px !important;

`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items:center;
    img {
      height: calc(100vh - 164px);
      /* margin-top: 52px; */
    }

`;


const Controls = styled.div`
    > * {
      cursor: pointer;
      width: 30px;
      height: 30px;
      font-size: 23px;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
    .next__modal {
      position: fixed;
      right: 30px;
      top: 50vh;
    }
    .previous__modal {
      position: fixed;
      left: 30px;
      top: 50vh;
    }
`;

class PostGrid extends Component {
  state = { 
    modalOpen: 'none',
    modalImage: 0
  }

  openModal = (imageIndex) => {
    if (this.state.modalOpen === "none") {
      this.setState(
        { 
          modalOpen: 'flex',
          modalImage: imageIndex
        })
    }

    document.querySelector('body').style = "overflow: hidden";
  }


  closeModal = () => {
    if (this.state.modalOpen === "flex") {
      this.setState(
        { 
          modalOpen: 'none'
        })
    }
    document.querySelector('body').style = "overflow-y: scroll";
  }

  nextImage = () => {
    // console.log(this.state.modalImage, this.props.content.length - 2);
    // this.setState({ 
    //   modalImage: this.state.modalImage++
    // })
    if (this.props.content ) {
      if (this.state.modalImage < this.props.content.length - 1 ) {
        this.setState({ 
            modalImage: this.state.modalImage+= 1
          })
      } else {
        this.setState({ 
          modalImage: 0
        })
      }
    }
   
  }

  previousImage = () => {
    if (this.state.modalImage <=  0) {
      this.setState({ 
          modalImage: this.props.content.length -1
        })
    } else {
      this.setState({ 
        modalImage: this.state.modalImage -= 1
      })
    }
  }

  render() {
      return (
          <section className={`post-grid ${this.props.screenType}`}>
              {this.props.content && this.props.content.map((reg, i)=> {
                    let imageClass;
                    let imageFile = reg.fields.file;
                    if (imageFile.url.includes('mov') || imageFile.url.includes('mp4')) {
                      return (
                        <div key={i} className={`horizontal-image ${this.props.screenType} video__wrapper`}>
                        <div className="inner__video">
                          <video src={imageFile.url} controls playsInline>
                          </video>
                        </div>
                      </div>
                      )
                    } else {
                      let imHeight = parseInt(imageFile.details.image.height, 10);
                      let imWidth = parseInt(imageFile.details.image.width, 10);
                      imageClass = imHeight > imWidth ? "vertical-image" : "horizontal-image";
                      return  <div key={i} className={`${imageClass} ${this.props.screenType}`}>
                        <div onClick={e => this.openModal(i)}>
                            <ImageLoaderBackground 
                            // style={{backgroundImage: `url(${imageFile.url}?w=600)`}}
                            preview={`${imageFile.url}?w=200`}
                            image={`${imageFile.url}?w=1920`}
                            ></ImageLoaderBackground>
                        </div>
                     
                      </div>
                    }
              })}

              <Modal open={this.state.modalOpen}>
                    <Controls>
                      <small className="next__modal" onClick={this.nextImage}> →   </small>
                      <small className="previous__modal" onClick={this.previousImage}>← </small>
                    </Controls>
                    <ImageContainer onClick={this.closeModal}>
                       {/* On click send the index number to the state */}
                       {/* Make the image in side of the modal that image number */}
                      {this.props.content && this.props.content[this.state.modalImage].fields.file.contentType.includes('image') && 
                        <img src={`${this.props.content[this.state.modalImage].fields.file.url}?w=1920`} />
                      }
                       {this.props.content && this.props.content[this.state.modalImage].fields.file.contentType.includes('video') && 
                         <video src={this.props.content[this.state.modalImage].fields.file.url} controls playsInline>
                         </video>
                      }
                       
                    </ImageContainer>
              </Modal>
          </section>
      );
  }
}

export default PostGrid;
