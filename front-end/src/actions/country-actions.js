import superagent from 'superagent';

const countriesFetch = countries => ({
  type: 'COUNTRIES_FETCH',
  payload: countries,
});

const countryCreate = country => ({
  type: 'COUNTRY_CREATE',
  payload: country,
});

const countryUpdate = country => ({
  type: 'COUNTRY_UPDATE',
  payload: country,
});

const countryDelete = country => ({
  type: 'COUNTRY_DELETE',
  payload: country,
});

// async functions
const countriesFetchRequest = () => (dispatch) => {
  return superagent.get(`${API_URL}/api/countries`)
    .then((response) => {
      dispatch(countriesFetch(response.body));
      return response; // don't have to return response, but nice to have in case of testing
    }); // no catch here because middleware handles it in its own try/catch block
};

const countryCreateRequest = country => (dispatch) => {
  return superagent.post(`${API_URL}/api/countries`)
    .send(country)
    .then((response) => {
      dispatch(countryCreate(response.body));
      return response;
    });
};

const countryUpdateRequest = country => (dispatch) => {
  return superagent.post(`${API_URL}/api/countries`)
    .send(country)
    .then((response) => {
      dispatch(countryUpdate(response.body));
      return response;
    });
};

const countryDeleteRequest = country => (dispatch) => {
  // return superagent.delete(`${API_URL}/api/countries/${country._id}`)
  return superagent.delete(`${API_URL}/api/countries`)

    .then((response) => {
      dispatch(countryDelete(country));
      return response;
    });
};

export {
  countriesFetchRequest,
  countryCreate,
  countryUpdate,
  countryCreateRequest,
  countryUpdateRequest,
  countryDeleteRequest,
};
