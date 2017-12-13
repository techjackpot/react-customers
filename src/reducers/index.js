import { combineReducers } from 'redux';
import CustomerReducer from './customer-reducer';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  customerStore: CustomerReducer,
  form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
