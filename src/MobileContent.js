import React from 'react';
import './App.css';

const MobileContent = (props) =>{
    return(
          <div className="mobile-content">
            <h3> Contact</h3>
            <p>{props.mobileContact.contactInfo}</p>
            <p>{props.mobileContact.email}</p>
            <p>{props.mobileContact.instagram}</p>
            <p>{props.mobileContact.phone}</p>
          </div>
    )

}

export default MobileContent;
