import mongoose, { Schema } from 'mongoose';
import validator from 'validator';


const PurchaseOrderSchema = new Schema({
    PurchaseOrderNo: {
        type: String,
        unique: true,
        required: true
    },
    QuotationId: {
        type: String
    },
    CustomerName: {
        type: String
    },
    Context: {
        type: String
    },
    CompanyName: {
        type: String
    },
    UserId: {
        type: String
    },
    Items: {
        type: []
    },
    Status: {
        type: String
    },
    TotalAmount: {
        type: Number
    },
    DateCreated: {
        type: Date,
        default: new Date()
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
})

export default mongoose.model('PurchaseOrder', PurchaseOrderSchema)