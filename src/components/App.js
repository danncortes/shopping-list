/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ProductsView from './products-view/products-view';
import ListsView from './lists-view/lists-view';
import ListsCreate from './lists-create/lists-create';
import Router from 'react-router-dom/Router';
import StatusBar from '../components/status-bar/status.bar';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <section>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand">Lista de compras</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to={'/'}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/lists'}>Listas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/products'}>Productos</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <StatusBar/>
                    <div className="container-fluid flex-row">
                        <Switch>
                            {/* <Route path="/lists" component={ListsView} /> */}
                            <Route path="/products" component={ProductsView} />
                            {/* <Route path="/" component={ListsCreate} /> */}
                        </Switch>
                    </div>
                </section>
            </BrowserRouter>
        );
    }
}

export default App;
