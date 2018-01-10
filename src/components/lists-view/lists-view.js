import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists } from '../../actions';

class ListsView extends Component {

    componentDidMount() {
        this.props.fetchLists();
    }

    renderItems() {
        const lists = this.props.lists.map((item) => {
            return (
                <tr key={item.id} className="valign-middle">
                    <td>{item.date}</td>
                    <td>{item.cost}</td>
                    <td>{item.nProducts}</td>
                    <td>{item.nItems}</td>
                    <td><button className="btn btn-warning btn-sm">Editar</button> <button className="btn btn-danger btn-sm">Eliminar</button></td>
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
    return { lists: state.lists }
}

export default connect(mapStateToProps, { fetchLists })(ListsView);