import React, { Component } from 'react';
import { reset, Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { create_product, editProduct } from '../../actions/products';
import { removeProductToEdit } from '../../actions';

class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.props.handleSubmit.bind(this);
    }
    renderField(field) {
        const { meta: { error, touched } } = field;
        return (
            <div className="mr-2">
                <input type="text"
                    className="form-control"
                    {...field.input}
                    placeholder={field.placeholder}
                />
            </div>
        );
    }

    onSubmit(values) {
        console.log('prop!', this.props);
        const { reset } = this.props;
        const isEditing = Object.keys(this.props.productToEdit).length !== 0;

        if (isEditing) {
            if (JSON.stringify(this.props.productToEdit) !== JSON.stringify(values)) {
                this.props.editProduct(this.props.productToEdit.id, values).then(() => {
                });
            }
            this.props.removeProductToEdit();
            reset();
        } else {
            this.props.create_product(values).then(() => {
                reset();
            });
        }
    }

    resetForm() {
        const { reset } = this.props;
        this.props.removeProductToEdit();
        reset();
    }

    render() {
        const isEditing = Object.keys(this.props.productToEdit).length !== 0;
        /* this.props.handleSubmit(this.onSubmit).bind(this) */
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="form-inline mb-4">
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
                <button type="submit" className="btn btn-primary mr-2">{isEditing ? 'Editar' : 'Crear'}</button>

                <button onClick={this.resetForm.bind(this)} className="btn btn-warning">Borrar</button>
            </form>
        );
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
        errors.store = 'Ingresa una tienda';
    }
    // If errors is empty the form is fine to submit
    return errors;
}

function mapStateToProps(state) {
    return {
        productToEdit: state.productToEdit,
    };
}

const mapDispatchToProps = dispatch => ({
    create_product: values => dispatch(create_product(values)),
});

export default reduxForm({
    validate,
    form: 'ProductCreateForm',
    enableReinitialize: true,
})(connect(mapStateToProps, mapDispatchToProps)(ProductCreate));

