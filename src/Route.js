import React, { Component } from 'react';
import GridwithSideBar from './GridwithSideBar';
import App from './App';
import Contact from './Contact';
import Post from './Post';
import NotFound from './NotFound';
import './App.css';
import {BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom'
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { generateKey,removeSpacing } from './utils/utils.js'


// Import contentful
var contentful = require('contentful')

class RouterIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      platform: ""
    }; // <- set up react state

    this.replaceUrl = this.replaceUrl.bind(this)
  }
  componentWillMount(){
    var client = contentful.createClient({
      space: 'g0gogpe6z8m0',
      accessToken: '635d0733430094c3ee8ed1a81dab920236052730f153dbc4eede999809128662'
    });

    // Get all articles
    client.getEntries({ content_type: 'article'
    }).then(function(res){
      let content = res.items;

      let sortedContent = content.sort((a,b) => a.fields.order > b.fields.order);

      let facesContent = content.filter((res) => res.fields.tag === "faces");

      let commercialContent = content.filter(function(res){
        return res.fields.tag === "commercial";
      });

      let editorialContent = content.filter(function(res){
        return res.fields.tag === "editorial";
      });

      let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
      iOS === true ? iOS = "isMobile" : iOS = "isDesktop";
      var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

      let is_chrome = !!window.chrome;

      is_chrome === true ? is_chrome = "isMobileChrome" : "";


      this.setState({
         contents: sortedContent,
         facesContent: facesContent,
         commercialContent: commercialContent,
         editorialContent: editorialContent,
         platform: iOS,
         chrome: ""
       });

    }.bind(this));

   // Get the contact page
   client.getEntries({ content_type: 'contact'
 }).then((res) => {
     var contactContent = res.items
     this.setState({  contactContent });
    });

  }

   replaceUrl(str) {
    str.replace(/\s/g, '-');
    return str;
  }
  
  isIos() {

  }

  render() {
    let theRelatedContent = this.state.contents;
    let theContactContent = this.state.contactContent;
    const allMessages = this.state.contents.map(function(reg,i) {
        return <Route key={i} path={`/${removeSpacing(reg.fields.title)}`} exact render={()=>
          <Post postClassName={reg.fields.tag} relatedContent={theRelatedContent} titleContent={theRelatedContent} contactMobile={theContactContent}  postContent={reg}/>}/>;
      }
  )


    return (
      <BrowserRouter>
      <div className={`${this.state.platform} ${this.state.chrome} router-example`}>
          <Route render={({location}) => (
            <ReactCSSTransitionReplace
              transitionName="cross-fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              <div key={location.pathname}>
                <Switch location={location}>
                  <Route path="/" exact className="index" render={()=><App num="2" contactMobile={this.state.contactContent} titleContent={this.state.contents} gridContents={this.state.contents}/>}/>
                    {allMessages}
                  <Route path="/faces" className="faces"  exact render={()=><GridwithSideBar num="2" className="faces"    contactMobile={this.state.contactContent} titleContent={this.state.contents} gridContents={this.state.facesContent}/>}/>
                  <Route path="/commercial" className="commercial" exact render={()=><GridwithSideBar num="2" className="commercial" contactMobile={this.state.contactContent}  titleContent={this.state.contents} gridContents={this.state.commercialContent}/>}/>
                  <Route path="/editorial" className="editorial" exact render={()=><GridwithSideBar contactMobile={this.state.contactContent}  className="editorial" num="2" titleContent={this.state.contents} gridContents={this.state.editorialContent}/>}/>
                  <Route path="/contact" className="contact" exact render={()=><Contact className="contact" contactMobile={this.state.contactContent} titleContent={this.state.contents} gridContents={this.state.contactContent}/>}/>
                  <Route path="*" render={()=><NotFound titleContent={this.state.contents} contactMobile={this.state.contactContent} />} />
                </Switch>
              </div>
            </ReactCSSTransitionReplace>
          )}/>
        </div>
      </BrowserRouter>

    );
  }
}

export default RouterIndex;
