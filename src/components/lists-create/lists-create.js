import React, { Component } from 'react';
import ProductsList from '../products-list/products-list';

class ListsCreate extends Component {
    constructor(props){
        super(props)
    }
    render() {
        
        return (
            <section className="col d-flex">
                <div className="col-4">1</div>
                <div className="col-8">
                    <ProductsList products="hola" />
                </div>
            </section>
        )
    }
}

export default ListsCreate;