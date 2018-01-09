import { combineReducers } from 'redux';
import Reducers  from './reducers';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    products: Reducers,
    lists: Reducers,
    form: formReducer
});

export default rootReducer;