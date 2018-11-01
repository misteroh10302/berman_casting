import React from 'react';
import ReactDOM from 'react-dom';
import Homegrid from './Homegrid';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Homegrid />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it('load more text', () => {
//   const wrapper = shallow(<Homegrid />);
//   const loadMore = 'LOAD MORE';
//   // expect(wrapper.contains(welcome)).to.equal(true);
//   expect(wrapper.contains(loadMore)).toEqual(true);
// });


it('Should test adding a class on mouseover', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Homegrid />, div);
});
