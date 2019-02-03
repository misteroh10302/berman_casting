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
    console.log(this.props.length)
    if (this.props.theContent.length > 1  && this.props.theContent !== undefined ) {
      this.state.limit <= this.props.theContent.length ?  this.setState({
        loadMore: 'load-more' }) : this.setState({
          loadMore: 'hidden' });
    }
   
  }

  fadeImages(e){
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
      // allGrid = this.props.theContent.slice(0,this.state.limit).map(function(reg,i) {
      //   let imageClass = i;
      //   let thumbFile = reg.fields.thumbnail.fields.file;
      //   let imHeight = parseInt(reg.fields.thumbnail.fields.file.details.image.height, 10);
      //   let imWidth = parseInt(reg.fields.thumbnail.fields.file.details.image.width, 10);
      //   imHeight > imWidth ? imageClass = "vertical-image" : imageClass = "horizontal-image";

      //    const input = reg.fields.postInformation;
      //     return <div key={`${reg.sys.id}`} className={imageClass } onMouseOver={fadeImages} onMouseOut={fadeOut}>
      //        <Link to={`/project/${removeSpacing(reg.fields.title)}`}>                                            
      //               <div >
      //                 <ImageLoaderBackground className={imageClass}
      //                   preview={`${reg.fields.thumbnail.fields.file.url}?w=200`}
      //                   image={`${reg.fields.thumbnail.fields.file.url}?w=1920`} >
      //                   </ImageLoaderBackground>
      //                 </div>
      //           <ReactMarkdown skipHtml source={input} />
      //           <small className='view__more'> see more </small>
      //        </Link>
      //      </div>
      //    })
    } else {
      allGrid = <GridHomePage 
                  content={this.props.theContent}
                  fadeImages={fadeImages}
                  fadeOut={fadeOut}
                  />
      // allGrid = this.props.theContent.map(function(reg,i) {
      // let imageClass = i;
      // let thumbFile = reg.fields.thumbnail.fields.file;
      // let imHeight = parseInt(thumbFile.details.image.height, 10);
      // let imWidth = parseInt(thumbFile.details.image.width, 10);
      // imHeight > imWidth ? imageClass = "vertical-image" : imageClass = "horizontal-image";
      // const input = reg.fields.postInformation;
      //     return <div key={`${reg.sys.id}`}  onMouseOver={fadeImages} onMouseOut={fadeOut}>
      //         <Link to={`/project/${removeSpacing(reg.fields.title)}`}>
      //         <div >
      //                 <ImageLoaderBackground className={imageClass}
      //                   preview={`${thumbFile.url}?w=200`}
      //                   image={`${thumbFile.url}?w=1920`} >
      //                   </ImageLoaderBackground>
      //                 </div>
      //             <ReactMarkdown skipHtml source={input} />
      //             <small className='view__more'> see more </small>
      //         </Link>
      //       </div>
      //   }  )
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

