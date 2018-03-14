import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ProductReducer from './reducer_products';
import StatusNotification from './reducer_status_notification';
import ListsReducer from './reducer_lists';
import CurrentListReducer from './reducer_current_list';

const rootReducer = combineReducers({
    products: ProductReducer,
    lists: ListsReducer,
    currentList: CurrentListReducer,
    form: formReducer,
    statusNotification: StatusNotification,
});

export default rootReducer;
