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
                  let thumbFile, imHeight, imWidth;
                  if (reg.fields.thumbnail ) {
                     thumbFile = reg.fields.thumbnail.fields.file;
                     imHeight = parseInt(reg.fields.thumbnail.fields.file.details.image.height, 10);
                     imWidth = parseInt(reg.fields.thumbnail.fields.file.details.image.width, 10);
                    if (this.props.home) {
                      imHeight > imWidth ? imageClass = "vertical-image" : imageClass = "horizontal-image";
                  }
                  }
                  
          
                   const input = reg.fields.postInformation;
                    return <div key={`${reg.sys.id}`} 
                               >
                       <Link to={`/project/${removeSpacing(reg.fields.title)}`}>                                            
                              <div>
                                  { reg.fields.thumbnail && 
                                    <ImageLoaderBackground  className={imageClass}
                                    preview={`${reg.fields.thumbnail.fields.file.url}?w=200`}
                                    image={`${reg.fields.thumbnail.fields.file.url}?w=1920`} >
                                    </ImageLoaderBackground>
                                
                                  } 
                                  { !reg.fields.thumbnail && 
                                    <ImageLoaderBackground className={imageClass}
                                    preview={`https://ak3.picdn.net/shutterstock/videos/13653953/thumb/1.jpg?i10c=img.resize(height:160)?w=200`}
                                    image={`https://ak3.picdn.net/shutterstock/videos/13653953/thumb/1.jpg?i10c=img.resize(height:160)?w=1920`} >
                                    </ImageLoaderBackground>
                                
                                  } 
                              </div>
                              <span  onMouseOver={this.props.fadeImages} 
                                onMouseOut={this.props.fadeOut}>
                          <ReactMarkdown skipHtml source={input} />
                          </span>
                          <small className='view__more'> see more </small>
                       </Link>
                     </div>
                   })
           
        );
    }
}

export default GridHomepage;