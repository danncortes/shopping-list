import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createProduct } from '../../actions';


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
        this.props.createProduct(values).then(() => {
            reset()
        });
    }

    render() {
        const handleSubmit = this.props.handleSubmit;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-inline mb-4">
                <Field
                    placeholder="Nombre"
                    name="name"
                    component={this.renderField}
                />
                <Field
                    placeholder="Precio"
                    name="price"
                    component={this.renderField}
                />
                <Field
                    placeholder="Tienda"
                    name="store"
                    component={this.renderField}
                />

                <button type="submit" className="btn btn-primary">Crear</button>
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



export default reduxForm({
    validate,
    form: 'ProductCreateForm'
})(connect(null, { createProduct })(ProductCreate));