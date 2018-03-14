import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductsAction } from '../../actions/products';
import { addProductToListAction } from '../../actions/current-list';
import { addProductToList, editProductOnList } from '../../actions';

class ProductsList extends Component {
    componentDidMount() {
        this.props.onFetchProducts();
    }

    addProduct(product, e) {
        const inputValue = e.target.parentNode.querySelector('input').value;
        product.quant = parseInt(inputValue);

        const newProd = {
            id: product.id,
            name: product.name,
            unitPrice: product.price,
            quant: product.quant,
            subTotal: product.price * product.quant,
            store: product.store,
        };

        const foundProduct = this.props.currentList.products.filter(item => item.id === product.id);

        if (foundProduct.length > 0) {
            this.props.editProductOnList(newProd);
        } else {
            this.props.onAddProductToList([newProd], newProd.subTotal, this.props.currentList.id);
        }
    }

    renderItems() {
        const { inProgress, hasError } = this.props.products.status;
        if (inProgress) {
            return <div>...Loading</div>;
        } else if (hasError) {
            return <div>Error Loading data</div>;
        }
        if (this.props.products.data.length !== 0) {
            let products = [];
            products = this.props.products.data.map((product) => {
                product.quant = 1;
                return product;
            });
            return products.map(product => (
                <li key={product.id} className="list-group-item d-flex justify-content-between align-items-start">
                    <span className="col-4">{product.name}</span>
                    <span className="col-2">{product.price}</span>
                    <span className="col-2">{product.store}</span>
                    <span className="col-2"><input type="number" className="form-control" defaultValue={product.quant} /></span>
                    <i onClick={(e) => { this.addProduct(product, e); }} className="fas fa-plus-square fa-2x text-success pointer"></i>
                </li>
            ));
        }
        return (
            <div>
                There are no products, create a new one here: <Link className="btn btn-success" to={'/products'}>Products</Link>
            </div>
        );
    }

    render() {
        console.log(this.props);
        return (
            <ul className="list-group">
                {this.renderItems()}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        currentList: state.currentList,
    };
}

const mapDispatchToProps = dispatch => ({
    onFetchProducts: () => dispatch(fetchProductsAction()),
    onAddProductToList: (products, subTotal, id) => dispatch(addProductToListAction(products, subTotal, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
