import React, { Component } from 'react';

class ListsView extends Component {

    renderItems(data) {
        return data.map((item) => {
            return (
                <li key={item.id}>{item.name}</li>
            )
        })
    }

    render() {

        const list = [
            {
                id: 1,
                name: 'Arroz Premium',
                price: 10
            },
            {
                id: 2,
                name: 'Azucar',
                price: 6
            }
        ]

        return (
            <ul>
                {this.renderItems(list)}
            </ul>
        )
    }
}

export default ListsView;