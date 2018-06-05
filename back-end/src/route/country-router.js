'use strict';

const Router = require('express');
const bodyParser = require('body-parser');
const HttpErrors = require('http-errors');
const Country = require('../model/country');

const jsonParser = bodyParser.json();

const countryRouter = new Router();

countryRouter.post('/api/countries', jsonParser, (request, response, next) => {
  return new Country(request.body).save()
    .then(country => response.json(country))
    .catch(next);
});

countryRouter.put('/api/countries/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  return Country.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedCountry) => {
      if (!updatedCountry) {
        return next(new HttpErrors(404, 'country not found'));
      }
      return response.json(updatedCountry);
    })
    .catch(next);
});

// countryRouter.put('/api/countries', jsonParser, (request, response, next) => {
//   return Country.find ()
//     .then((updatedCountry) => {
//       if (!updatedCountry) {
//         return next(new HttpErrors(404, 'country not found'));
//       }
//       return response.json(updatedCountry);
//     })
//     .catch(next);
// });

countryRouter.get('/api/countries/:id', (request, response, next) => {
  return Country.findById(request.params.id)
    .then((country) => {
      if (!country) {
        return next(new HttpErrors(404, 'country not found'));
      }
      return response.json(country);
    })
    .catch(next);
});

countryRouter.get('/api/countries', (request, response, next) => {
  return Country.find({})
    .then((country) => {
      if (!country) {
        return next(new HttpErrors(404, 'No countries found'));
      }
      return response.json(country);
    })
    .catch(next);
});

countryRouter.delete('/api/countries/:id', (request, response, next) => {
  return Country.findByIdAndRemove(request.params.id)
    .then((country) => {
      if (!country) {
        return next(new HttpErrors(404, 'country not found'));
      }
      return response.sendStatus(204);
    });
});

module.exports = countryRouter;