import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductsSelectedList extends Component {

    renderList(){
        return this.props.selectedProducts.map((item)=>{
            return (
                <li key={item.id}>{item.name}</li>
            )
        })
    }

    render() {
        return (
            <ul className="selected-products-list">
                {this.renderList()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedProducts: state.selectedProducts
    }
}

export default connect(mapStateToProps)(ProductsSelectedList);