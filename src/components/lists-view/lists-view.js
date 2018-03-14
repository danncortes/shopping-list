import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListsAction, deleteListAction, updateListAction } from '../../actions/lists';

class ListsView extends Component {
    componentDidMount() {
        this.props.onFetchLists();
    }

    editList(list) {
        this.props.clearList();
        const products = JSON.parse(list.products);
        this.props.addProductToList(products, list.cost, list.id);
        this.props.history.push('/');
    }

    onPurchaseList(list) {
        const { id } = list;
        list.purchased = true;
        this.props.onUpdateList(id, list);
    }

    renderItems() {
        const lists = this.props.lists.data.map(list => (
            <tr key={list.id} className="valign-middle">
                <td>{list.date}</td>
                <td>{list.cost}</td>
                <td>{list.nProducts}</td>
                <td>{list.nItems}</td>
                <td>
                    <button className="btn btn-warning btn-sm mr-2" onClick={this.editList.bind(this, list)} style={{ display: list.purchased ? 'none' : 'initial' }}>Editar</button>

                    <button className="btn btn-danger btn-sm mr-2" onClick={this.props.onDeleteList.bind(this, list.id)}>Eliminar</button>

                    <button className={`btn ${list.purchased ? '' : 'btn-success'} btn-sm`} onClick={this.onPurchaseList.bind(this, list)} disabled={ list.purchased ? 'disabled' : '' }>{list.purchased ? 'Comprada' : 'Comprar'}</button>
                </td>
            </tr>
        ));

        return lists;
    }

    render() {
        const { inProgress, hasError } = this.props.lists.status;
        if (inProgress) {
            return <div>...Loading</div>;
        } else if (hasError) {
            return <div>Error Loading data</div>;
        }
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
        );
    }
}

function mapStateToProps(state) {
    return {
        lists: state.lists,
    };
}

const mapDispatchToProps = dispatch => ({
    onFetchLists: () => dispatch(fetchListsAction()),
    onDeleteList: id => dispatch(deleteListAction(id)),
    onUpdateList: (id, list) => dispatch(updateListAction(id, list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsView);
