import React, { Component } from 'react';
import Navigation from '../Nav';
import '../App.css';
import Footer from '../Footer/Footer';
import Homegrid from '../Homepage/Homegrid';
import Sidebar from '../Sidebar';

class GridwithSideBar extends Component {
  componentWillMount() {
      window.scrollTo(0, 0);
      document.querySelector('body').classList.remove('fix-background');

  }
  render() {

    return (
      <div className={`App ${this.props.className}`} id="faces">
            <Navigation
                        contactMobile={this.props.contactMobile}
                        titleContent={this.props.titleContent}
                        nameOfPage={`: ${this.props.className}`}
            />
          <section>
            <Sidebar num="1" theTitles={this.props.gridContents}/>
            <Homegrid theContent={this.props.gridContents} />
          </section>

        <Footer />
      </div>
    );
  }
}

export default GridwithSideBar;
