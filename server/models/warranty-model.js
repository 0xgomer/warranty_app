import {Schema, model} from "mongoose";

const WarrantySchema = new Schema({
    user: {
        id: {type: Schema.Types.ObjectId, ref: 'User'},
        username: {type: String, required: true}
    },
    created: {type: Date, default: new Date()},
    serial: {type: String, required: true, unique: true},
    product: {type: String, required: true},
    warranty: {type: Number, required: true}
})

export default model('Warranty', WarrantySchema)