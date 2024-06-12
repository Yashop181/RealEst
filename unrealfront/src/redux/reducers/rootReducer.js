import { combineReducers } from 'redux';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  properties: propertyReducer
});

export default rootReducer;
