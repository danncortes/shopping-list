import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
    it('Render', () => {
        const wrapper = shallow(<App />);
    });
});
