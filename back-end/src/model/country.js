'use strict';

import mongoose from 'mongoose';

const countrySchema = mongoose.Schema({
  region: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
 
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'place',
    },
  ],
});

export default mongoose.model('country', countrySchema);
