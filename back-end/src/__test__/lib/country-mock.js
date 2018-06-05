'use strict';

import faker from 'faker';
import Country from '../../model/country';


const pCreateCountryMock = () => {
  return new Country({
    region: faker.lorem.words(10),
    state: faker.lorem.words(2),
  }).save();
};

const pRemoveCountryMock = () => Country.remove({});

export { pCreateCountryMock, pRemoveCountryMock };
