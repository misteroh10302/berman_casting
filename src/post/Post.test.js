import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Post />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it('load more text', () => {
//   const wrapper = shallow(<Homegrid />);
//   const loadMore = 'LOAD MORE';
//   // expect(wrapper.contains(welcome)).to.equal(true);
//   expect(wrapper.contains(loadMore)).toEqual(true);
// });
