import React, { Component } from 'react';
import ProductListCreate from '../product-list-create/product-list-create';
import CurrentList from '../current-list/current-list';

class ListsCreate extends Component {
    render() {
        return (
            <section className="row">
                <div className="col-5">
                    <h4 className="mb-3">Crear Lista de Compras</h4>
                    <div className="box-list">
                        <CurrentList/>
                    </div>
                </div>
                <div className="col-7">
                    <h4 className="mb-3">Productos</h4>
                    <ProductListCreate/>
                </div>
            </section>
        );
    }
}

export default ListsCreate;
