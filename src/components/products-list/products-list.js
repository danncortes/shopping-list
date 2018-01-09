import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';
import { addProductToList } from '../../actions';

class ProductsList extends Component{

    componentDidMount() {
        this.props.fetchProducts();
        console.log(this.props)
    }

    renderItems(){
        return this.props.products.map((item)=>{
            return (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <span className="col-5">{item.name}</span>
                    <span className="col-2">{item.price}</span>
                    <span className="col-3">{item.store}</span>
                    <button onClick={this.props.addProductToList.bind(this, item)} className="btn btn-success btn-sm">Add</button>
                </li>
            )
        })
    }

    render(){
        return(
            <section>
                <h3 className="mb-3">Productos</h3>
                <ul className="list-group">
                    {this.renderItems()}
                </ul>
            </section>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        products: state.products,
        productsList: state.productsList
    }
}

export default connect(mapStateToProps, {fetchProducts, addProductToList})(ProductsList);