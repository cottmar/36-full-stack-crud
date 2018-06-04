'use strict';

import faker from 'faker';
import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateCountryMock } from './lib/country-mock';
import { pCreatePlaceMock, pRemovePlaceMock } from './lib/place-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api/places`;

describe('/api/places', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemovePlaceMock);

  describe('POST /api/places', () => {
    test('200 status code in creation', () => {
      return pCreateCountryMock() 
        .then((countryMock) => {
          const placeToPost = {
            region: faker.lorem.words(10),
            state: faker.lorem.words(11),
            country: countryMock._id,
          };

          return superagent.post(apiUrl)
            .send(placeToPost)
            .then((response) => {
              expect(response.status).toEqual(200);
            });
        });
    });
  });
  describe('PUT /api/places', () => {
    test('200 status code in creation', () => {
      let placeToUpdate = null;
      return pCreatePlaceMock()
        .then((mock) => {
          placeToUpdate = mock.place;
          return superagent.put(`${apiUrl}/${mock.place._id}`)
            .send({ region: 'Pacific Northwest' });
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.region).toEqual('Pacific Northwest');
          expect(response.body.state).toEqual(placeToUpdate.state); // may cause probls
        });
    });
  }); // describe
});
