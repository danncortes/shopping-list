import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';
import { addProductToList, editProductOnList } from '../../actions';

class ProductsList extends Component{

    componentDidMount() {
        this.props.fetchProducts();
    }

    addProduct(product, e){
        var inputValue = e.target.parentNode.querySelector('input').value;
        product.quant = parseInt(inputValue);
        const foundProduct = this.props.selectedProducts.products.filter((item)=>{
            return item.id === product.id;
        })
        const newProd = {
            id: product.id,
            name: product.name,
            unitPrice: product.price,
            quant:product.quant,
            subTotal: product.price * product.quant,
            store: product.store
        }
        if(foundProduct.length > 0){
            this.props.editProductOnList(newProd);
        }else{
            this.props.addProductToList([newProd], newProd.subTotal, '');
        }
    }

    renderItems(){

        if(this.props.products.length !== 0){
            let products = [];
            products = this.props.products.map((item)=>{
                item.quant = 1;
                return item
            })
            return products.map((item)=>{
                return (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
                        <span className="col-4">{item.name}</span>
                        <span className="col-2">{item.price}</span>
                        <span className="col-2">{item.store}</span>
                        <span className="col-2"><input type="number" className="form-control" defaultValue={item.quant} /></span>
                        <a onClick={(e)=>{this.addProduct(item, e)}} className="btn btn-success btn-sm d-block">Add</a>
                    </li>
                )
            })
        }
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

export default connect(mapStateToProps, {fetchProducts, addProductToList, editProductOnList})(ProductsList);