import { combineReducers } from 'redux';
import ProductReducer from './reducer_products';
import StatusBar from './reducer_status_bar';
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
    statusBar: StatusBar,
});

export default rootReducer;
