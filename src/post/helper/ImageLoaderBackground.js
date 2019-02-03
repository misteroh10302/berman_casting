import React, { Component } from 'react';


class ImageLoaderBackground extends Component {
    state = {
        currentImage: this.props.preview,
        loading: true,
      }
    
      componentDidMount() {
        this.fetchImage(this.props.image)
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.image !== this.props.image) {
          this.setState({ currentImage: nextProps.preview, loading: true }, () => {
            this.fetchImage(nextProps.image)
          })
        }
      }
    
      componentWillUnmount() {
        if (this.loadingImage) {
          this.loadingImage.onload = null
        }
      }
    
      fetchImage = src => {
        const image = new Image()
        image.onload = () => this.setState({ currentImage: this.loadingImage.src, loading: false })
        image.src = src
        this.loadingImage = image
      }
    
      style = loading => {
        return {
          transition: '0.5s filter linear',
          filter: `${loading ? 'blur(10px)' : ''}`,
          backgroundImage: `${loading ? `url(${this.props.preview})` : `url(${this.props.image})`}`,
        }
      }
    
      render() {
        const { currentImage, loading } = this.state
        const { alt } = this.props
        return <div  style={this.style(loading)} className={this.props.className}>
          {/* <img style={this.style(loading)} src={currentImage} alt={alt} /> */}
        </div>;
      }
}

export default ImageLoaderBackground;