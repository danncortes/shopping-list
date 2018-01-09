import { combineReducers } from 'redux';
import ProductReducer  from './reducer_products';
import ListsReducer  from './reducer_lists';
import ProductListReducer from './reducer_listproducts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    products: ProductReducer,
    lists: ListsReducer,
    listProducts:ProductListReducer,
    form: formReducer
});

export default rootReducer;