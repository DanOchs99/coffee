const mongoose = require('mongoose')

// define schema
// structure of the collection
const orderSchema = new mongoose.Schema({
    name: String,
    date: String,
    order: String,
    email: String
})

// pass in two parameters - 
// name of collection in MongoDB (mongoose will make plural)
// schema
const Order = mongoose.model('Order', orderSchema)

module.exports = Order
