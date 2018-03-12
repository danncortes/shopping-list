import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch_products, delete_product } from '../../actions/products';
import { pickProductToEdit } from '../../actions';
import ProductCreate from '../product-create/product-create';

class ProductsView extends Component {
    componentDidMount() {
        this.props.fetch_products();
    }

    renderItems() {
        return this.props.products.data.map(product => (
            <tr key={product.id} className="valign-middle">
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.store}</td>
                <td>
                    <button className="btn btn-warning btn-sm mr-2" onClick={() => { this.props.pickProductToEdit(product); }}>Editar</button>
                    <button onClick={this.props.delete_product.bind(this, product.id)} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
        ));
    }

    render() {
        const { inProgress, hasError } = this.props.products.status.fetch;
        if (inProgress) {
            return <div>...Loading</div>;
        } else if (hasError) {
            return <div>Error Loading data</div>;
        }
        return (
            <section className="col">
                <h4>Crear Producto</h4>
                <ProductCreate initialValues={this.props.productToEdit} />
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
        productToEdit: state.productToEdit,
    };
}

const mapDispatchToProps = dispatch => ({
    fetch_products: () => dispatch(fetch_products()),
    delete_product: id => dispatch(delete_product(id)),
    pickProductToEdit: product => dispatch(pickProductToEdit(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
