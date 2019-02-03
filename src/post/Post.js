import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Navigation from '../Header/Nav';
import Homegrid from '../Homepage/Homegrid';
import Sidebar from '../Categories/Sidebar';
import '../App.css';
import ReactMarkdown from 'react-markdown';
import PostGrid from './PostGrid';
import BackgroundImageLoader from './helper/BackgroundImageLoader';
import PostImageHeader from './elements/PostImageHeader';
import PostVideoHeader from './elements/PostVideoHeader';

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

    let postGrid, postGridDesktop, postGridMobile, verticalBanner, headerSection, theVideoElement;
    let postBanner = this.props.postContent.fields.banner;
    headerSection = <section className="loading">Loading</section>;

    // if the banner is a video
    if (postBanner && postBanner.fields.file.details.image !== undefined) {
      // if the banner is vertical make the header nav have black and add a class
      if (postBanner.fields.file.details.image.height > postBanner.fields.file.details.image.width ) {
        verticalBanner = "verticalBanner"
      }
      headerSection = <BackgroundImageLoader style={{width: '100%'}}
        preview={`${postBanner.fields.file.url}?w=200`}
        image={`${postBanner.fields.file.url}?w=1920`}
      />

    } else if (postBanner) {
      // if the image is actually a mov
      theVideoElement = postBanner.fields.file.url;
      headerSection = <PostVideoHeader theVideoElement={theVideoElement}/>;

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
       <span>
       {headerSection}
        <div className="header">
          <ReactMarkdown source={this.props.postContent.fields.postInformation ? this.props.postContent.fields.postInformation : ''} />
        </div>
        </span>
       
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
