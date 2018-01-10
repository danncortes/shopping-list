import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';
import { addProductToList } from '../../actions';

class ProductsList extends Component{

    componentDidMount() {
        this.props.fetchProducts();
    }

    renderItems(){
        return this.props.products.map((item)=>{
            return (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
                    <span className="col-5">{item.name}</span>
                    <span className="col-2">{item.price}</span>
                    <span className="col-3">{item.store}</span>
                    <a onClick={this.props.addProductToList.bind(this, item)} className="btn btn-success btn-sm d-block">Add</a>
                </li>
            )
        })
    }

    render(){
        return(
            <ul className="list-group">
                {this.renderItems()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        selectedProducts: state.selectedProducts
    }
}

export default connect(mapStateToProps, {fetchProducts, addProductToList})(ProductsList);