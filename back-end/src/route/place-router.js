'use strict';

const { Router } = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const Place = require('../model/place-model');

// import { Router } from 'express';
// import bodyParser from 'body-parser';
// import HttpError from 'http-errors';
// // import logger from '../lib/logger';
// import Place from '../model/place-model';

const jsonParser = bodyParser.json();
const placeRouter = new Router();

placeRouter.post('/api/places', jsonParser, (request, response, next) => {
  return new Place(request.body).save()
    .then((place) => {
      // logger.log(logger.INFO, 'POST - responding with a 200 status code');
      response.json(place);
    })
    .catch(next);
});

placeRouter.put('/api/places/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };

  return Place.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedPlace) => {
      if (!updatedPlace) {
        // logger.log(logger.INFO, 'PUT - responding with a 404 status code');
        return next(new HttpError(404, 'place not found'));
      }
      // logger.log(logger.INFO, 'PUT - responding with a 200 status code');
      return response.json(updatedPlace); // Returns a 200
    })
    .catch(next);
});

module.exports = placeRouter;
