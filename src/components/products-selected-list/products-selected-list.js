import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveList, clearList, removeProductFromList, updateList } from '../../actions';

class ProductsSelectedList extends Component {

    postList() {
        const products = this.props.selectedProducts.products;

        function sumItems(arr, index) {
            var total = 0;
            arr.forEach((item) => {
                total += item[index];
            })
            return total;
        }
        var nItems = sumItems(products, 'quant');

        const list = {
            nItems: nItems,
            nProducts: products.length,
            cost: this.props.selectedProducts.total,
            date: new Date(),
            purchased: false,
            products: JSON.stringify(products)
        }

        if (this.props.selectedProducts.id === '') {
            this.props.saveList(list).then(() => {
                this.props.clearList();
            });
        }
        else {
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
        else {
            return this.props.selectedProducts.products.map((item) => {
                return (
                    <li key={item.id} className="item">
                        <div className="row">
                            <span className="col-4">{item.name}</span>
                            <span className="col-2">{item.quant}</span>
                            <span className="col-2">{item.unitPrice}</span>
                            <span className="col-2">{item.subTotal}</span>
                            <span className="col-2"> <a className="btn btn-sm" onClick={this.props.removeProductFromList.bind(this, item)}>X</a> </span>
                        </div>
                    </li>
                )
            })
        }
    }

    render() {

        var submitBtn = this.props.selectedProducts.products.length === 0 ? '' : <a className="btn btn-success btn-sm" onClick={this.postList.bind(this)}>{this.props.selectedProducts.id === '' ? 'Guardar' : 'Editar'}</a>;

        var cancelBtn = this.props.selectedProducts.id === '' ? '' : <a className="btn btn-danger btn-sm" onClick={this.cancelEdit.bind(this)}>Cancel</a>;

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
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedProducts: state.selectedProducts
    }
}

export default connect(mapStateToProps, { saveList, clearList, removeProductFromList, updateList })(ProductsSelectedList);