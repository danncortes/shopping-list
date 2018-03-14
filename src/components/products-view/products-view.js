import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductsAction, deleteProductAction, selectProductToEditAction } from '../../actions/products';
import ProductCreate from '../product-create/product-create';

class ProductsView extends Component {
    componentDidMount() {
        this.props.onFetchProducts();
    }

    productToEdit() {
        const initialValues = {};
        let product = '';
        const { inProgress, hasError } = this.props.products.status;
        if (!(inProgress && hasError)) {
            product = this.props.products.data.find(product => product.isOnEdit === true);
        }
        if (product) {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                store: product.store,
            };
        }
        return initialValues;
    }

    renderItems() {
        return this.props.products.data.map(product => (
            <tr key={product.id} className="valign-middle">
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.store}</td>
                <td>
                    <button className="btn btn-warning btn-sm mr-2" onClick={() => { this.props.onSelectProductToEdit(product.id); }}>Editar</button>
                    <button onClick={this.props.onDeleteProduct.bind(this, product.id)} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
        ));
    }

    render() {
        const productToEdit = this.productToEdit();
        const { inProgress, hasError } = this.props.products.status;
        if (inProgress) {
            return <div>...Loading</div>;
        } else if (hasError) {
            return <div>Error Loading data</div>;
        }
        return (
            <section className="col">
                <h4>Crear Producto</h4>
                <ProductCreate initialValues={productToEdit} />
                <h4>Productos</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Tienda</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
    };
}

const mapDispatchToProps = dispatch => ({
    onFetchProducts: () => dispatch(fetchProductsAction()),
    onDeleteProduct: id => dispatch(deleteProductAction(id)),
    onSelectProductToEdit: id => dispatch(selectProductToEditAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
