import React, { Component } from 'react';
import { reset, Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { createProduct, editProduct, removeProductToEdit } from '../../actions';


class ProductCreate extends Component {
    
    renderField(field) {

        const { meta: { error, touched } } = field
        return (
            <div>
                <input type="text"
                    className="form-control"
                    {...field.input}
                    placeholder={field.placeholder}
                />
            </div>
        )
    }

    onSubmit(values) {
        const { reset } = this.props;
        const isEditing = Object.keys(this.props.productToEdit).length != 0;
        
        if(isEditing){
            if(JSON.stringify(this.props.productToEdit) !== JSON.stringify(values)){
                this.props.editProduct(this.props.productToEdit.id, values).then(() => {
                });
            }
            this.props.removeProductToEdit()
            reset()
        }
        else{
            this.props.createProduct(values).then(() => {
                reset()
            });

        }
    }

    resetForm(){
        const { reset } = this.props;
        this.props.removeProductToEdit()
        reset()
    }
    
    render() {
        const isEditing = Object.keys(this.props.productToEdit).length != 0;
        const handleSubmit = this.props.handleSubmit;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-inline mb-4">
                <Field
                    placeholder="Nombre"
                    name="name"
                    component={this.renderField.bind(this)}
                />
                <Field
                    placeholder="Precio"
                    name="price"
                    component={this.renderField.bind(this)}
                />
                <Field
                    placeholder="Tienda"
                    name="store"
                    component={this.renderField.bind(this)}
                />
                <button type="submit" className="btn btn-primary">{isEditing  ? 'Editar' : 'Crear'}</button>
                <a onClick={this.resetForm.bind(this)} className="btn btn-warning">Borrar</a>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.name) {
        errors.name = 'Ingresa un nombre';
    }
    if (!values.price) {
        errors.price = 'Ingresa un precio';
    }
    if (!values.store) {
        errors.store = 'Ingresa una tienda'
    }
    //If errors is empty the form is fine to submit
    return errors;
}

function mapStateToProps(state) {
    return {
        productToEdit: state.productToEdit
    }
}

export default reduxForm({
    validate,
    form: 'ProductCreateForm',
    enableReinitialize: true
})(connect(mapStateToProps,  { createProduct, removeProductToEdit, editProduct })(ProductCreate));

