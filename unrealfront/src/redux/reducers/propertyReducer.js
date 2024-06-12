// src/redux/reducers/propertyReducer.js

import { GET_PROPERTIES, ADD_PROPERTY } from '../actions/types';

const initialState = {
  properties: [],
  loading: true
};

const propertyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROPERTIES:
      return {
        ...state,
        properties: payload,
        loading: false
      };
    case ADD_PROPERTY:
      return {
        ...state,
        properties: [payload, ...state.properties],
        loading: false
      };
    default:
      return state;
  }
};

export default propertyReducer;
