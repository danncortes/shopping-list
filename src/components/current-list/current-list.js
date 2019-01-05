import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createListAction, updateListAction } from '../../actions/lists';
import { clearCurrentListAction, removeFromCurrentListAction } from '../../actions/current-list';

class CurrentList extends Component {
    postList() {
        const { products } = this.props.currentList;

        function sumItems(arr, index) {
            let total = 0;
            arr.forEach((item) => {
                total += item[index];
            });
            return total;
        }
        const nItems = sumItems(products, 'quant');

        const list = {
            nItems,
            nProducts: products.length,
            cost: this.props.currentList.total,
            date: moment().format(),
            purchased: false,
            products: JSON.stringify(products),
        };

        if (this.props.currentList.id === '') {
            this.props.onCreateList(list);
            this.props.onClearCurrentList();
        } else {
            this.props.onUpdateList(this.props.currentList.id, list);
            this.props.onClearCurrentList();
        }
    }

    cancelEdit() {
        this.props.onClearCurrentList();
    }

    renderList() {
        if (this.props.currentList.products.length === 0) {
            return (
                <li className="p-3 text-center">Agrega productos a la lista</li>
            );
        }

        return this.props.currentList.products.map(product => (
            <li key={product.id} className="item">
                <div className="row">
                    <span className="col-4">{product.name}</span>
                    <span className="col-2">{product.quant}</span>
                    <span className="col-2">{product.unitPrice}</span>
                    <span className="col-2">{product.subTotal}</span>
                    <span className="col-2"> <button className="btn btn-warning btn-sm" onClick={this.props.onRemoveProductCurrentList.bind(this, product)}><i className="fas fa-trash-alt"></i></button> </span>
                </div>
            </li>
        ));
    }

    cancelButton() {
        return <button className="btn btn-danger btn-sm" onClick={this.cancelEdit.bind(this)}>Cancel</button>;
    }

    renderActionsButtons() {
        if (this.props.currentList.products.length === 0) {
            return (<span></span>);
        }
        if (this.props.currentList.purchased) {
            return this.cancelButton();
        }
        return (
            <span>
                <button className="btn btn-success btn-sm mr-2" onClick={this.postList.bind(this)}>{this.props.currentList.id === '' ? <i className="fas fa-save"> Guardar</i> : 'Editar'}</button>
                {this.cancelButton()}
            </span>
        );
    }

    render() {
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
                        <span className="col-2">{this.props.currentList.total}</span>
                        <span></span>
                    </div>
                    <div>
                        {this.renderActionsButtons()}
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentList: state.currentList,
    };
}

const mapDispatchToProps = dispatch => ({
    onCreateList: list => dispatch(createListAction(list)),
    onClearCurrentList: () => dispatch(clearCurrentListAction()),
    onRemoveProductCurrentList: product => dispatch(removeFromCurrentListAction(product)),
    onUpdateList: (id, list) => dispatch(updateListAction(id, list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentList);
