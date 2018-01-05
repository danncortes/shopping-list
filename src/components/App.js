import React, { Component } from 'react';
import './App.css';

import ListsView from './lists-view/lists-view';

class App extends Component {
    render() {
        return (
            <div>
            <h1>my app</h1>
            <ListsView/>
            </div>
        );
    }
}

export default App;
