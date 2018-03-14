import React, { Component } from 'react';
import { reset, Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { createProductAction, editProductAction, removeProductToEditAction } from '../../actions/products';

class ProductCreate extends Component {
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

    isEditing() {
        return Object.keys(this.props.initialValues).length !== 0;
    }

    onSubmit(values) {
        const { reset } = this.props;
        const isEditing = this.isEditing();

        if (isEditing) {
            if (JSON.stringify(this.props.initialValues) !== JSON.stringify(values)) {
                this.props.onEditProduct(this.props.initialValues.id, values);
            }
            this.props.onRemoveProductToEdit();
            reset();
        } else {
            this.props.onCreateProduct(values);
            reset();
        }
    }

    resetForm() {
        const { reset } = this.props;
        this.props.onRemoveProductToEdit();
        reset();
    }

    render() {
        const isEditing = this.isEditing();
        const { handleSubmit } = this.props;
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

function mapStateToProps() {
    return {};
}

const mapDispatchToProps = dispatch => ({
    onCreateProduct: values => dispatch(createProductAction(values)),
    onRemoveProductToEdit: () => dispatch(removeProductToEditAction()),
    onEditProduct: (id, values) => dispatch(editProductAction(id, values)),
});

export default reduxForm({
    validate,
    form: 'ProductCreateForm',
    enableReinitialize: true,
})(connect(mapStateToProps, mapDispatchToProps)(ProductCreate));

