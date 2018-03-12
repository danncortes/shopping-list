import { combineReducers } from 'redux';
import ProductReducer from './reducer_products';
import StatusNotification from './reducer_status_notification';
import ListsReducer from './reducer_lists';
import ProductListReducer from './reducer_listproducts';
import ProductToEditReducer from './reducer_product_to_edit';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    products: ProductReducer,
    lists: ListsReducer,
    selectedProducts: ProductListReducer,
    productToEdit: ProductToEditReducer,
    form: formReducer,
    statusNotification: StatusNotification,
});

export default rootReducer;
