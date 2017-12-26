import mongoose, { Schema } from 'mongoose';
import validator from 'validator'

const ProductSchema = new Schema({
  Name : {
    type: String,
    unique: true,
    required: [true, 'Product Name is required!'],
    minLength: [5, 'Product Name minimum length is 5']
  },
  Description: {
    type: String,
    required: [true, 'Description is required!']
  },
  Features: {
    type: String
  },
  Context: {
    type: String
  },
  SKU: {
    type: String
  },
  Images: {
    type: [String]
  },
  DateCreated: {
    type: Date
  },
  CreatedBy: {
    type: String
  },
  DateUpdated: {
    type: Date
  },
  UpdatedBy: {
    type: String
  }
});

export default mongoose.model('Product', ProductSchema);
