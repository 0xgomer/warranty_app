import {Schema, model} from "mongoose";

const ProductSchema = new Schema({
    name: {type: String, required: true, unique: true},
    warranty: {type: Number, required: true},
    serial: [{type: String, unique: true, required: true}],
})

export default model('Product', ProductSchema)