import ImageLoaderBackground from '../../post/helper/ImageLoaderBackground';
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown';
import { generateKey,removeSpacing } from '../../utils/utils.js'

class GridHomepage extends Component {
    render() {
        return (
           this.props.content.map((reg,i) => {
                  let imageClass ='vertical-image';
                  let thumbFile = reg.fields.thumbnail.fields.file;
                  let imHeight = parseInt(reg.fields.thumbnail.fields.file.details.image.height, 10);
                  let imWidth = parseInt(reg.fields.thumbnail.fields.file.details.image.width, 10);
                  if (this.props.home) {
                    imHeight > imWidth ? imageClass = "vertical-image" : imageClass = "horizontal-image";
                  }
          
                   const input = reg.fields.postInformation;
                    return <div key={`${reg.sys.id}`} 
                                onMouseOver={this.props.fadeImages} 
                                onMouseOut={this.props.fadeOut}>
                       <Link to={`/project/${removeSpacing(reg.fields.title)}`}>                                            
                              <div>
                                <ImageLoaderBackground  className={imageClass}
                                  preview={`${reg.fields.thumbnail.fields.file.url}?w=200`}
                                  image={`${reg.fields.thumbnail.fields.file.url}?w=1920`} >
                                  </ImageLoaderBackground>
                                </div>
                          <ReactMarkdown skipHtml source={input} />
                          <small className='view__more'> see more </small>
                       </Link>
                     </div>
                   })
           
        );
    }
}

export default GridHomepage;