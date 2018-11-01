import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './App.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.num
    }

    this.makeGray = this.makeGray.bind(this);
    this.returnGray = this.returnGray.bind(this);
  }
  componentDidMount(){
    this.setState({
      titles: this.props.theTitles
    });
  }

  makeGray(e) {
    // We are selecting all of the current anchors and making them gray
    const allListItems = document.querySelectorAll('aside ul li a');
    for ( let i = 0; i <  allListItems.length; i++ ) {
      allListItems[i].style.color ="#0000007d";
    }
    // We want to make sure that the current hovered anchor is black
    e.target.style.color = "black";
  }

  returnGray(e) {
    // return all anchors in the list to black
    const allListItems = document.querySelectorAll('aside ul li a');
    for ( let i = 0; i <  allListItems.length; i++ ) {
      allListItems[i].style.color ="black";
    }
  }


  render() {
    let allTitles;
    if(this.props.theTitles === undefined) {
       allTitles =   <div dangerouslySetInnerHTML={{ __html: "" }} />;
    } else {
       allTitles = this.props.theTitles.map((reg,i) =>
          <li onMouseOver={this.makeGray} onMouseOut={this.returnGray}>
            <Link to={'/'+reg.fields.title}>
                {reg.fields.title}
            </Link>
          </li>
      )
    }
    return (
      <aside>
        <ul>
          {allTitles}
        </ul>
      </aside>
    );
  }
}

export default Sidebar;
