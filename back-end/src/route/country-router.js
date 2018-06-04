'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Country from '../model/country';
import logger from '../lib/logger';


const jsonParser = bodyParser.json();

const countryRouter = new Router();

countryRouter.post('/api/countries', jsonParser, (request, response, next) => {
  if (!request.body.region) {
    logger.log(logger.ERROR, 'COUNTRY-ROUTER: Responding with 400 error code');
    return next(new HttpErrors(400, 'Country region is required'));
  }

  return new Country(request.body).save()
    .then(country => response.json(country))
    .catch(next);
});

countryRouter.put('/api/countries/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  return Country.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedCountry) => {
      if (!updatedCountry) {
        logger.log(logger.ERROR, 'COUNTRYROUTER: responding with 404 status code - !updatedCountry');
        return next(new HttpErrors(404, 'country not found'));
      }

      logger.log(logger.INFO, 'GET - responding with 200 status code');
      return response.json(updatedCountry);
    })
    .catch(next);
});

countryRouter.get('/api/countries/:id', (request, response, next) => {
  return Country.findById(request.params.id)
    .then((country) => {
      if (!country) {
        logger.log(logger.ERROR, 'COUNTRY ROUTER: responding with 404 status code !country');
        return next(new HttpErrors(404, 'country not found'));
      }

      logger.log(logger.INFO, 'COUNTRY ROUTER: responding with 200 status code');
      logger.log(logger.INFO, `COUNTRY ROUTER: ${JSON.stringify(country)}`);
      return response.json(country);
    })
    .catch(next);
});

countryRouter.delete('/api/countries/:id', (request, response, next) => {
  return Country.findByIdAndRemove(request.params.id)
    .then((country) => {
      if (!country) {
        logger.log(logger.ERROR, 'COUNTRY ROUTER: responding with 404 !country');
        return next(new HttpErrors(404, 'country not found'));
      }

      logger.log(logger.INFO, 'COUNTRY ROUTER: responding with 204 status code');
      return response.sendStatus(204);
    });
});

export default countryRouter;
