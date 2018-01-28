import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const CategorySchema = new Schema({
    Name: {
        type: String,
        required: [true, 'Name is required']
    },
    Context: {
        type: String
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

export default mongoose.model('Category', CategorySchema);