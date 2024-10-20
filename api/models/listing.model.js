import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for the listing'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for the listing'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    address: {
      type: String,
      required: [true, 'Please provide an address'],
    },
    regularPrice: {
      type: Number,
      required: [true, 'Please provide a regular price'],
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.regularPrice;
        },
        message: 'Discount price should be less than the regular price',
      },
    },
    bathrooms: {
      type: Number,
      required: [true, 'Please provide the number of bathrooms'],
      min: [1, 'There must be at least 1 bathroom'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Please provide the number of bedrooms'],
      min: [1, 'There must be at least 1 bedroom'],
    },
    furnished: {
      type: Boolean,
      required: [true, 'Please specify if the property is furnished'],
      default: false,
    },
    parking: {
      type: Boolean,
      required: [true, 'Please specify if parking is available'],
      default: false,
    },
    type: {
      type: String,
      required: [true, 'Please specify the type (sale or rent)'],
      enum: ['sale', 'rent'],
    },
    offer: {
      type: Boolean,
      required: true,
      default: false,
    },
    imageUrls: {
      type: [String],
      required: [true, 'Please provide image URLs for the listing'],
      validate: [arrayLimit, 'You must provide at least one image URL'],
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Listing must be associated with a user'],
    },
  },
  { timestamps: true }
);

// Validator for imageUrls array length
function arrayLimit(val) {
  return val.length > 0;
}

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
