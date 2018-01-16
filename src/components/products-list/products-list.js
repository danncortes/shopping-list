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

        const newProd = {
            id: product.id,
            name: product.name,
            unitPrice: product.price,
            quant:product.quant,
            subTotal: product.price * product.quant,
            store: product.store
        }

        const foundProduct = this.props.selectedProducts.products.filter((item)=>{
            return item.id === product.id;
        })
        
        if(foundProduct.length > 0){
            this.props.editProductOnList(newProd);
        }else{
            this.props.addProductToList([newProd], newProd.subTotal, this.props.selectedProducts.id);
        }
    }

    renderItems(){

        if(this.props.products.length !== 0){
            let products = [];
            products = this.props.products.map((product)=>{
                product.quant = 1;
                return product
            })
            return products.map((product)=>{
                return (
                    <li key={product.id} className="list-group-item d-flex justify-content-between align-items-start">
                        <span className="col-4">{product.name}</span>
                        <span className="col-2">{product.price}</span>
                        <span className="col-2">{product.store}</span>
                        <span className="col-2"><input type="number" className="form-control" defaultValue={product.quant} /></span>
                        <i onClick={(e)=>{this.addProduct(product, e)}} className="fas fa-plus-square fa-2x text-success pointer"></i>
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