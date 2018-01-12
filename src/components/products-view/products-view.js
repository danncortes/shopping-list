import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, deleteProduct, pickProductToEdit } from '../../actions';
import  ProductCreate from '../product-create/product-create';

class ProductsView extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    deleteProduct(id) {
        this.props.deleteProduct(id);
    }

    renderItems() {
        return this.props.products.map((item) => {
            return (
                <tr key={item.id} className="valign-middle">
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.store}</td>
                    <td><button className="btn btn-warning btn-sm" onClick={()=>{this.props.pickProductToEdit(item)}}>Editar</button> <button onClick={this.deleteProduct.bind(this, item.id)} className="btn btn-danger btn-sm">Eliminar</button></td>
                </tr>
            )
        })
    }

    render() {
        if (this.props.products.length === 0) {
            return <div>...Loading</div>
        }
        return (
            <section className="col">
                <h4>Crear Producto</h4>
                <ProductCreate initialValues={this.props.productToEdit}/>
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
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        productToEdit: state.productToEdit
    }
}

export default connect(mapStateToProps, { fetchProducts, deleteProduct, pickProductToEdit })(ProductsView);