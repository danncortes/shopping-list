import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { saveList, clearList, removeProductFromList, updateList } from '../../actions';

class ProductsSelectedList extends Component {
    postList() {
        const products = this.props.selectedProducts.products;

        function sumItems(arr, index) {
            let total = 0;
            arr.forEach((item) => {
                total += item[index];
            });
            return total;
        }
        let nItems = sumItems(products, 'quant');

        const list = {
            nItems,
            nProducts: products.length,
            cost: this.props.selectedProducts.total,
            date: moment().format(),
            purchased: false,
            products: JSON.stringify(products),
        };

        if (this.props.selectedProducts.id === '') {
            this.props.saveList(list).then(() => {
                this.props.clearList();
            });
        } else {
            this.props.updateList(list, this.props.selectedProducts.id).then(() => {
                this.props.clearList();
            });
        }
    }

    cancelEdit() {
        this.props.clearList();
    }

    renderList() {
        if (this.props.selectedProducts.products.length === 0) {
            return (
                <li className="p-3 text-center">Agrega productos a la lista</li>
            )
        }
        
            return this.props.selectedProducts.products.map((product) => {
                return (
                    <li key={product.id} className="item">
                        <div className="row">
                            <span className="col-4">{product.name}</span>
                            <span className="col-2">{product.quant}</span>
                            <span className="col-2">{product.unitPrice}</span>
                            <span className="col-2">{product.subTotal}</span>
                            <span className="col-2"> <button className="btn btn-warning btn-sm" onClick={this.props.removeProductFromList.bind(this, product)}><i className="fas fa-trash-alt"></i></button> </span>
                        </div>
                    </li>
                )
            })
        
    }

    render() {
        let submitBtn = this.props.selectedProducts.products.length === 0 ? '' : <button className="btn btn-success btn-sm mr-2" onClick={this.postList.bind(this)}>{this.props.selectedProducts.id === '' ? <i className="fas fa-save"> Guardar</i> : 'Editar'}</button>;

        let cancelBtn = this.props.selectedProducts.id === '' ? '' : <button className="btn btn-danger btn-sm" onClick={this.cancelEdit.bind(this)}>Cancel</button>;

        return (
            <section>
                <div className="row mb-3 header-selected-prod">
                    <span className="col-4">Nombre</span>
                    <span className="col-2">Cant.</span>
                    <span className="col-2">Precio (Un)</span>
                    <span className="col-2">Subtotal</span>
                </div>
                <ul className="selected-products-list">
                    {this.renderList()}
                </ul>
                <div>
                    <div className="row">
                        <span className="col-6"></span>
                        <span className="col-2">Total</span>
                        <span className="col-2">{this.props.selectedProducts.total}</span>
                        <span>{submitBtn}{cancelBtn}</span>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedProducts: state.selectedProducts,
    };
}

export default connect(mapStateToProps, {
 saveList, clearList, removeProductFromList, updateList 
})(ProductsSelectedList);
