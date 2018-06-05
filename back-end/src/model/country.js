'use strict';

// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
  title: {
    type: String,
    // require: true,
  },
  region: {
    type: String,
    // required: true,
    // unique: true,
  },
  state: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
 
  places: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'place',
    },
  ],
});

module.exports = mongoose.model('country', countrySchema);

// export default mongoose.model('country', countrySchema);
