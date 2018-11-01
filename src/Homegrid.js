import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import $ from 'jquery';
import ReactMarkdown from 'react-markdown';

class Homegrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theContent: [],
      fakeContent: '<div><div></div><p>name</p><p>data</p><p>category</p></div>',
      number: this.props.num,
      pageName: this.props.pageName,
      limit: 3,
      loadMore: 'load-more',
      isScrolled: false
    }

    this.onLoadMore = this.onLoadMore.bind(this);
    this.fadeImages = this.fadeImages.bind(this);
  }
  componentWillMount(){
    window.addEventListener('scroll', this.lockScroll);
  }

  fadeImages(e){
    const allGridItems = document.querySelectorAll('.home-grid > div');
    allGridItems.forEach((item) => {
        item.classList.add("lighter__opacity");
    })
    e.target.closest('.lighter__opacity').classList.remove("lighter__opacity");

  }


  fadeOut(e){
    const allGridItems = document.querySelectorAll('.home-grid > div');
    allGridItems.forEach((item) => {
        item.classList.remove("lighter__opacity");
    })
  }


  onLoadMore(e) {
    e.preventDefault();
      if (this.state.limit + 3 >= this.props.theContent.length) {
        this.setState({
            loadMore: 'hidden'
        });
      }
        this.setState({
            limit: this.state.limit + 3
        });
  }


  render() {
    let allGrid;
    let fadeImages = this.fadeImages;
    let fadeOut = this.fadeOut;
    if(this.state.pageName === "homepage") {
      allGrid = this.props.theContent.slice(0,this.state.limit).map(function(reg,i) {

        let imageClass = i;
        let imHeight = parseInt(reg.fields.thumbnail.fields.file.details.image.height, 10);
        let imWidth = parseInt(reg.fields.thumbnail.fields.file.details.image.width, 10);
        if(imHeight>imWidth) {
           imageClass = "vertical-image";
        } else {
          imageClass = "horizontal-image";
        }

         const input = reg.fields.postInformation;
          return <div key={i} className={imageClass} onMouseOver={fadeImages} onMouseOut={fadeOut}>
             <Link to={reg.fields.title}>
               <div style={{backgroundImage: `url(${reg.fields.thumbnail.fields.file.url})`}} >
               </div>
                <ReactMarkdown skipHtml source={input} />
                <small className='view__more'> see more </small>
             </Link>
           </div>
         })
    }

    else if(this.props.theContent === undefined) {
      allGrid =   <div dangerouslySetInnerHTML={{ __html: this.state.fakeContent }} />;
    } else {
      const theContent = this.props.theContent.length;
      allGrid = this.props.theContent.map(function(reg,i) {
      const input = reg.fields.postInformation;
          return <div >
              <Link to={reg.fields.title}>
                <div
                  style={{backgroundImage: `url(${reg.fields.thumbnail.fields.file.url})`}} >
                </div>
                  <ReactMarkdown skipHtml source={input} />
                  <small className='view__more'> see more </small>
              </Link>
            </div>
        }  )
    }
    return (
      <main className="home-grid"  >
        {allGrid}
        <a href="#"
          className={this.state.loadMore}
          onClick={this.onLoadMore}>LOAD MORE</a>
      </main>

    );
  }
}

export default Homegrid;
