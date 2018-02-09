import mongoose, { Schema } from 'mongoose';
import validators from 'validators';

const DeliverySchema = new Schema({
    DeliveryReceiptId: {
        type: String,
        required: [true, 'Delivery Receipt Id is required']
    },
    Context: {
        type: String
    },
    Items: {
        type: [Object]
    },
    Status: {
        type: String
    },
    DateDelivered: {
        type: Date
    },
    DateCreated: {
        type: Date,
        default: new Date()
    },
    CreatedBy: {
        type: String
    }
})

export default mongoose.model('Delivery', DeliverySchema);