'use strict';

import faker from 'faker';
import Place from '../../model/place-model';
import * as countryMock from './country-mock'; // bad practice

const pCreatePlaceMock = () => {
  const resultMock = {};

  return countryMock.pCreateCountryMock() // creating a country
    .then((createdCountry) => {
      // Step 2 : Create a new place
      resultMock.country = createdCountry;

      return new Place({
        region: faker.lorem.words(5),
        state: faker.lorem.words(10),
        country: createdCountry._id,
      }).save();
    })
    .then((newPlace) => {
      resultMock.place = newPlace;
      return resultMock;
    });
};

const pRemovePlaceMock = () => Promise.all([
  Place.remove({}),
  countryMock.pRemoveCountryMock(),
]);

export { pCreatePlaceMock, pRemovePlaceMock };
