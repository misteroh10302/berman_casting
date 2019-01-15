import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../App.css';

class Sidebar extends Component {

  state = {
    number: this.props.num
  }

  makeGray = this.makeGray.bind(this);
  returnGray = this.returnGray.bind(this);


  static defaultProps = {
     theTitles: []
   }

  componentDidMount(){
    this.setState({ titles: this.props.theTitles });
  }

  makeGray(e) {
    // We are selecting all of the current anchors and making them gray
    document.querySelectorAll('aside ul li a').forEach((el,i) => {
        el.style.color ="#0000007d";
    })
    // We want to make sure that the current hovered anchor is black
    e.target.style.color = "black";
  }

  returnGray(e) {
    // return all anchors in the list to black
    document.querySelectorAll('aside ul li a').forEach((el,i) => {
        el.style.color ="black";
    })
  }


  render() {
    let allTitles = this.props.theTitles.map((reg,i) =>
          <li onMouseOver={this.makeGray} key={`${reg.sys.id}`} onMouseOut={this.returnGray}>
            <Link to={'/'+reg.fields.title}>{reg.fields.title} </Link>
        </li>
    )

    return (
      <aside>
        <ul> {allTitles} </ul>
      </aside>
    );
  }
}


export default Sidebar;
