'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Country from '../model/country';
import { startServer, stopServer } from '../lib/server';

const apiUrl = `http://localhost:${process.env.PORT}/api/countries`;

const pCreateCountryMock = () => {
  return new Country({
    region: faker.lorem.words(15),
    state: faker.lorem.words(2),
  }).save();
};

describe('api/countries', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => Country.remove({}));

  describe('POST api/countries', () => {
    test('200', () => {
      const mockCountry = {
        region: faker.lorem.words(10),
        state: faker.lorem.words(2),
        city: faker.lorem.words(2),
      };
      return superagent.post(apiUrl)
        .send(mockCountry)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.region).toEqual(mockCountry.region);
          expect(response.body.state).toEqual(mockCountry.state);
          expect(response.body.city).toEqual(mockCountry.city);
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();
        });
    });

    test('409 due to duplicate region', () => {
      return pCreateCountryMock()
        .then((country) => {
          const mockCountry = {
            region: country.region,
            state: country.state,
            city: country.city,
          };
          return superagent.post(apiUrl)
            .send(mockCountry);
        })
        .then(Promise.reject)
        .catch((err) => {
          expect(err.status).toEqual(409);
        });
    });

    test('400 due to lack of region', () => {
      return superagent.post(apiUrl)
        .send({})
        .then(Promise.reject)
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });

    test('400 due to bad json', () => {
      return superagent.post(apiUrl)
        .send('{')
        .then(Promise.reject)
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
  });

  describe('PUT api/countries', () => {
    test('200 for succcesful PUT', () => {
      let countryToUpdate = null;
      return pCreateCountryMock()
        .then((country) => {
          countryToUpdate = country;
          return superagent.put(`${apiUrl}/${country._id}`)
            .send({ region: 'I HAVE A NEW COUNTRY REGION' });
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.region).toEqual('I HAVE A NEW COUNTRY REGION');
          expect(response.body.state).toEqual(countryToUpdate.state);
          expect(response.body.city).toEqual(countryToUpdate.city);
          expect(response.body._id).toEqual(countryToUpdate._id.toString());
          expect(response.body.timestamp).toBeTruthy();
        });
    });

    return pCreateCountryMock()
      .then((country) => {
        return superagent.put(`${apiUrl}/${country._id}`)
          .send({ region: country.region });
      })
      .catch((err) => {
        expect(err.status).toEqual(409);
      });
  });

  test('404 if no country found', () => {
    return superagent.put(`${apiUrl}/invalidId`) 
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });
  test('400 for bad request', () => {
    return pCreateCountryMock()
      .then((country) => {
        return superagent.put(`${apiUrl}/${country._id}`)
          .send({ region: '' });
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });
 

  describe('GET /api/countries', () => {
    test('200', () => {
      let tempCountry = null;
      return pCreateCountryMock()
        .then((country) => {
          tempCountry = country;
          return superagent.get(`${apiUrl}/${country._id}`)
            .then((response) => {
              expect(response.status).toEqual(200);
              expect(response.body._id).toEqual(tempCountry._id.toString());
            });
        });
    });
    test('should respond with 404 if there is no country to be found', () => {
      return superagent.get(`${apiUrl}/THisIsAnInvalidId`)
        .then(Promise.reject) 
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/countries', () => {
    test('204', () => {
      return pCreateCountryMock()
        .then((country) => {
          return superagent.delete(`${apiUrl}/${country._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(204);
        });
    });
  });
  describe('DELETTE /api/countries_id', () => {
    test('404 if no country found', () => {
      return superagent.delete(`${apiUrl}/invalidId`) 
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });
});
