import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import ReactMarkdown from 'react-markdown';
import { generateKey,removeSpacing } from '../utils/utils.js'
import OnScreen from '../helpers/OnScreen.js';
import LazyLoad from 'react-lazyload';
import { CSSTransitionGroup } from 'react-transition-group';
import ImageLoaderBackground from '../post/helper/ImageLoaderBackground';
import GridHomePage from './grid/GridHomepage';


class Homegrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theContent: [],
      limit: 3,
      loadMore: 'load-more',
      isScrolled: false
    }

    this.onLoadMore = this.onLoadMore.bind(this);
    this.fadeImages = this.fadeImages.bind(this);
  }

  static defaultProps = {
    theContent: []
  }
  componentWillMount(){
    // window.addEventListener('scroll', this.lockScroll);
  
    if (this.props.theContent.length > 1  && this.props.theContent !== undefined ) {
      this.state.limit <= this.props.theContent.length ?  this.setState({
        loadMore: 'load-more' }) : this.setState({
          loadMore: 'hidden' });
    }
   
  }

  fadeImages(e){
    // console.log(e);
    const allGridItems = document.querySelectorAll('.home-grid > div');
    allGridItems.forEach((item) => { item.classList.add("lighter__opacity"); })
    e.target.closest('.lighter__opacity').classList.remove("lighter__opacity");
  }


  fadeOut(e){
    const allGridItems = document.querySelectorAll('.home-grid > div');
    allGridItems.forEach((item) => { item.classList.remove("lighter__opacity"); })
  }

  onLoadMore(e) {
    e.preventDefault();
    // if the number counter is greater than the state
    this.state.limit >= this.props.theContent.length ?  this.setState({
      loadMore: 'hidden' }) : this.state.limit + 1 === this.props.theContent.length ?
      this.setState({ limit: this.state.limit + 3,   loadMore: 'hidden'}) : 
      this.setState({ limit: this.state.limit + 3}) ;
  }


  render() {
    let allGrid;
    let fadeImages = this.fadeImages;
    let fadeOut = this.fadeOut;
    if(this.props.pageName === "homepage") {
      allGrid = <GridHomePage 
                  content={this.props.theContent.slice(0,this.state.limit)} 
                  home={true}
                  fadeImages={fadeImages}
                  fadeOut={fadeOut}
                  />
      
    } else {
      allGrid = <GridHomePage 
                  content={this.props.theContent}
                  fadeImages={fadeImages}
                  fadeOut={fadeOut}
                  />

    }
    return (
      <main className="home-grid">
        {allGrid}
        <a href=""
          className={this.state.loadMore}
          onClick={this.onLoadMore}>LOAD MORE</a>
      </main>

    );
  }
}

export default Homegrid;

