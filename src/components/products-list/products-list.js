import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';
import { addProductToList } from '../../actions';

class ProductsList extends Component{

    componentDidMount() {
        this.props.fetchProducts();
    }

    setQuantity(e, item){
        item.quant = parseInt(e.target.value);
    }

    addProduct(product){
        const foundProduct = this.props.selectedProducts.products.filter((item)=>{
            return item.id === product.id;
        })
        if(foundProduct.length > 0){

        }else{
            const newProd = {
                id: product.id,
                name: product.name,
                unitPrice: product.price,
                quant:product.quant,
                subTotal: product.price * product.quant,
                store: product.store
            }

            this.props.addProductToList(newProd);
        }
    }

    renderItems(){
        return this.props.products.map((item)=>{
            item.quant = 1;
            return (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
                    <span className="col-4">{item.name}</span>
                    <span className="col-2">{item.price}</span>
                    <span className="col-2">{item.store}</span>
                    <span className="col-2"><input type="number" className="form-control" onChange={(e)=>this.setQuantity(e, item)} defaultValue='1' /></span>
                    <a onClick={this.addProduct.bind(this, item)} className="btn btn-success btn-sm d-block">Add</a>
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