import mongoose, { Schema } from 'mongoose';
import validator from 'validator';


const SpecificationSchema = new Schema({
    Category: {
        type: String,
        unique: true,
        required: [true, 'Category is required']
    },
    Context: {
        type: String
    },
    SpecificationItem: {
        type: [String]
    },
    DateCreated: {
        type: Date,
        default: new Date()
    },
    CreatedBy: {
        type: String
    }
})

export default mongoose.model('Specifications', SpecificationSchema);