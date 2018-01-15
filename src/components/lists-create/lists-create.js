import React, { Component } from 'react';
import ProductsList from '../products-list/products-list';
import ProductsSelectedList from '../products-selected-list/products-selected-list';

class ListsCreate extends Component {
    render() {
        return (
            <section className="row">
                <div className="col-5">
                    <h4 className="mb-3">Crear Lista de Compras</h4>
                    <div className="box-list">
                        <ProductsSelectedList/>
                    </div>
                </div>
                <div className="col-7">
                    <h4 className="mb-3">Productos</h4>
                    <ProductsList/>
                </div>
            </section>
        )
    }
}

export default ListsCreate;