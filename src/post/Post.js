import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Navigation from '../Header/Nav';
import Homegrid from '../Homepage/Homegrid';
import Sidebar from '../Categories/Sidebar';
import '../App.css';
import ReactMarkdown from 'react-markdown';
import PostGrid from './PostGrid';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postContent: this.props.postContent.fields.postCOntent,
      postClass: this.props.postClassName,
      postRelatedContent: [],
      limit: 3,
      loadMore: "shown"
    }
    this.onLoadMore = this.onLoadMore.bind(this)

  }

  componentWillMount() {
      window.scrollTo(0, 0);
      document.querySelector('body').classList.remove('fix-background');
      // get scrolltop of more
  }
  componentDidMount() {
    // There should only be on set State call here!
    // Fix and update this
    let thePostClass = this.state.postClass;

    // Getting the related content for the bottom of the Post
    if (this.props.relatedContent) {
      let relatedContent = this.props.relatedContent.filter((res) =>  res.fields.tag === thePostClass);
      this.setState({postRelatedContent: relatedContent});
    }

    // Get the height of the div element for the More Posts section
    const height = this.divElement.offsetTop;
    this.setState({ height });

    // Load More Post
    if (this.state.limit >= this.state.postContent.length) {
      this.setState({loadMore: 'hidden'});
    }
  }

  onLoadMore(e) {
    // There should be an else clause here.
    e.preventDefault();
    if (this.state.limit + 3 >= this.state.postContent.length) {
      this.setState({loadMore: 'hidden' })
    }
    // update the limit for the load more function
    this.setState({limit: this.state.limit + 3});

  }


  render() {
    // TO DO: Break Post Grids into Smaller Components
    //        Break SLider Header into a Smaller Component
    let postGrid, postGridDesktop, postGridMobile, verticalBanner, headerSection, theVideoElement;
    headerSection = <section className="loading">Loading</section>;
    // if there is no post content return
    if(this.state.postContent.length <=0) {
      // postGrid = "nothing here";
      // return postGrid;
    } else {
    
    }


    let input = " add Information";
    if (this.props.postContent.fields.postInformation)  {
       input = this.props.postContent.fields.postInformation;
    }

    // if the banner is a video
    if (this.props.postContent.fields.banner && this.props.postContent.fields.banner.fields.file.details.image !== undefined) {
      // if the banner is vertical make the header nav have black and add a class
      if (this.props.postContent.fields.banner.fields.file.details.image.height > this.props.postContent.fields.banner.fields.file.details.image.width ) {
        verticalBanner = "verticalBanner"
      }

      headerSection =  <section style={{backgroundImage: 'url('+this.props.postContent.fields.banner.fields.file.url+')'}} className="slider"></section>;

    } else if (this.props.postContent.fields.banner) {
      // if the image is actually a mov

      theVideoElement = this.props.postContent.fields.banner.fields.file.url;
      headerSection = <section style={{backgroundColo: 'whitesmoke'}} className="slider">
            <video width="320" height="240" autoPlay muted loop nocontrols>
              <source src={theVideoElement} type="video/mp4" />

            Your browser does not support the video tag.
            </video>
      </section>;

    }

    return (
      <div className={`App ${verticalBanner}`} id="post">
        <Navigation
          scrollToPoint={this.state.height}
          contactMobile={this.props.contactMobile}
          className={verticalBanner}
          postClass={`: ${this.state.postClass}`}
          titleContent={this.props.titleContent}
          nameOfPage={`: ${this.props.postContent.fields.title}`}/>
        {headerSection}
        <div className="header">
          <ReactMarkdown source={input} />
        </div>
          <section className="main">
            {/* Must get the load more button to work here! */}
            <PostGrid content={this.state.postContent} screenType={"desktop"}/>
            <PostGrid content={this.state.postContent} screenType={"mobile"}/>

            {/* <section className="post-grid"> */}
              {/* <PostGrid content={this.state.postContent}/> */}
              {/* {postGridDesktop}
              {postGridMobile} */}
              {/* <a href=""
                className={`${this.state.loadMore} loadMore`}
                onClick={this.onLoadMore}>LOAD MORE</a> */}
            {/* </section> */}
          </section>
          <section
            className="more-posts"
            id={this.state.height}
            ref={ (divElement) => this.divElement = divElement}>
              <Sidebar num="1" theTitles={this.state.postRelatedContent}/>
              <Homegrid theContent={this.state.postRelatedContent} />
          </section>
        <Footer />
      </div>
    );
  }
}

export default Post;
