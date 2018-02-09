import mongoose, { Schema } from 'mongoose';
import validators from 'validators';

const DeliverableSchema = new Schema({
    PurchaseOrderId: {
        type: String,
        required: true
    },
    Status: {
        type: Status
    },
    Context: {
        type: String
    },
    Items: {
        type: []
    },
    DateCreated: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('Deliverable', DeliverableSchema);