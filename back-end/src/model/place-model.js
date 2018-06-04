'use strict';

import mongoose from 'mongoose';
import HttpError from 'http-errors';
import Country from './country';

const placeSchema = mongoose.Schema({
  region: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  country: {
    type: mongoose.Schema.Types.ObjectId, // this is _id
    required: true,
    ref: 'country',
  },
});

function placePreHook(done) { 
  return Country.findById(this.country)
    .then((countryFound) => {
      if (!countryFound) {
        throw new HttpError(404, 'country not found');
      }
      countryFound.places.push(this._id);
      return countryFound.save();
    })
    .then(() => done()) // done without any arguments mean success - save
    .catch(done); // done with results means an error - do not save
}

const placePostHook = (document, done) => {
  return Country.findById(document.country)
    .then((countryFound) => {
      if (!countryFound) {
        throw new HttpError(500, 'country not found');
      }
      countryFound.places = countryFound.places.filter((place) => {
        return place._id.toString() !== document._id.toString();
      });
    })
    .then(() => done()) // success
    .catch(done);
};

placeSchema.pre('save', placePreHook);
placeSchema.post('remove', placePostHook);

export default mongoose.model('place', placeSchema);
