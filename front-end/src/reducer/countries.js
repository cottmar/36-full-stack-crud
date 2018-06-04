// is item the many ? so place ??? 

import { validateCountry } from '../utils';

const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'COUNTRIES_FETCH':
      return payload;
    case 'COUNTRY_CREATE':
      validateCountry(payload);
      return [payload, ...state];
    case 'COUNTRY_UPDATE':
      validateCountry(payload);
      return state.map(item => (item._id === payload._id ? payload : item));
    case 'COUNTRY_DELETE':
      validateCountry(payload);
      return state.filter(item => item._id !== payload._id);
    default:
      return state;
  }
}