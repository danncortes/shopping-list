import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductToList } from '../../actions';

class ProductsSelectedList extends Component {

    renderList(){
        return this.props.selectedProducts.map((item)=>{
            return (
                <li>{item.name}</li>
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

export default connect(mapStateToProps, {addProductToList})(ProductsSelectedList);