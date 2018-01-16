import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists, deleteList, purchaseList, addProductToList, clearList } from '../../actions';

class ListsView extends Component {

    componentDidMount() {
        this.props.fetchLists();
    }

    deleteListClick(list){
        this.props.deleteList(list)
    }

    editList(list){
        this.props.clearList();
        var products = JSON.parse(list.products);
        this.props.addProductToList(products, list.cost, list.id);
        this.props.history.push('/');
    }

    purchaseListClick(list){
        list.purchased = true;
        this.props.purchaseList(list)
    }

    renderItems() {
        const lists = this.props.lists.map((item) => {
            return (
                <tr key={item.id} className="valign-middle">
                    <td>{item.date}</td>
                    <td>{item.cost}</td>
                    <td>{item.nProducts}</td>
                    <td>{item.nItems}</td>
                    <td>
                        <button className="btn btn-warning btn-sm mr-2" onClick={()=>{this.editList(item)}} style={{ display: item.purchased ? 'none' : 'initial' }}>Editar</button>
                        <button className="btn btn-danger btn-sm mr-2" onClick={this.deleteListClick.bind(this, item)}>Eliminar</button>
                        <button className={`btn ${item.purchased ? '' : 'btn-success'} btn-sm`} onClick={this.purchaseListClick.bind(this, item)} disabled={ item.purchased ? 'disabled' : '' }>{item.purchased ? 'Comprada' : 'Comprar'}</button>
                    </td>
                </tr>
            )
        })

        return lists;
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Monto</th>
                        <th scope="col">N Prod.</th>
                        <th scope="col">N Items</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state) {
    return {
        lists: state.lists,
        selectedProducts: state.selectedProducts
    }
}

export default connect(mapStateToProps, { fetchLists, deleteList, purchaseList, addProductToList, clearList })(ListsView);