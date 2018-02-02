import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
import thunk from 'redux-thunk';

const myLogger = (store) => (next) => (action) => {
    console.log('Logged action', action);
    next(action)
}

const store = applyMiddleware(myLogger,promise)(createStore);

ReactDOM.render(
    <Provider store={store(reducers)} >
        <App/>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
