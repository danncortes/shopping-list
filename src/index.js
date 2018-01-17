import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import promise from 'redux-promise';
import reducers from './reducers';
import thunk from 'redux-thunk';


// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers';

// // Note: this API requires redux@>=3.1.0
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

const store = applyMiddleware(thunk)(createStore);

// const store = createStore(
//     (state = {}) => state,
//     applyMiddleware(thunk)
// );

// ReactDOM.render(
//     <Provider store={store} >
//         <App/>
//     </Provider>
// , document.getElementById('root'));
// registerServiceWorker();

ReactDOM.render(
    <Provider store={store(reducers)} >
        <App/>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
