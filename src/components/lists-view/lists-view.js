import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchListsAction, deleteListAction, updateListAction } from '../../actions/lists';
import { clearCurrentListAction, addProductToListAction } from '../../actions/current-list';

class ListsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logList: [],
        };
    }
    componentDidMount() {
        this.props.onFetchLists();
    }

    componentWillReceiveProps() {
        this.setState({ logList: this.props.lists.data });
    }

    editList(list) {
        this.props.onClearCurrentList();
        const products = JSON.parse(list.products);
        this.props.onAddProductToList(products, list.cost, list.id, list.purchased);
        this.props.history.push('/');
    }

    onPurchaseList(list) {
        const { id } = list;
        list.purchased = true;
        this.props.onUpdateList(id, list);
    }

    onFilter(date) {
        const dateParam = new Date(date).setHours(0);
        const logList = this.props.lists.data.filter((log) => {
            const logDate = new Date(log.date).setHours(0, 0, 0, 0);
            return dateParam === logDate;
        });
        this.setState({ logList });
    }

    renderItems() {
        const lists = this.state.logList.map(list => (
            <tr key={list.id} className="valign-middle">
                <td>{list.date}</td>
                <td>{list.cost}</td>
                <td>{list.nProducts}</td>
                <td>{list.nItems}</td>
                <td>
                    <button className="btn btn-warning btn-sm mr-2" onClick={this.editList.bind(this, list)}>
                        {list.purchased ? 'Ver' : 'Editar'}
                    </button>

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
            <Fragment>
                <button onClick={() => { this.onFilter('11-09-2017'); }}>Filter 11-09-2017</button>
                <button onClick={() => { this.onFilter('08-21-2017'); }}>Filter 08-21-2017</button>
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
            </Fragment>
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
    onClearCurrentList: () => dispatch(clearCurrentListAction()),
    onAddProductToList: (products, subTotal, id, purchased) => dispatch(addProductToListAction(products, subTotal, id, purchased)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsView);
