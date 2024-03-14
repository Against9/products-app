const mongoose = require("mongoose")

const Schema = mongoose.Schema

let productSchema = new Schema({
    product: {type: String, require: true},
    cost: {type: Number, require: true},
    description: {type: String, require: true},
    quantity: {type: Number, required: true}
}, {
    collection: "products",
    timestamps: true
})



module.exports = mongoose.model("Product", productSchema)