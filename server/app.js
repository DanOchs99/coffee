const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')
const Order = require('./models/order')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/coffee', {useNewUrlParser: true, useUnifiedTopology: true});

// orders GET - read all the orders
app.get('/orders',(req,res)=>{
    Order.find({})
    .then(orders => {
        res.json(orders)
    })
})

// orders POST - create a new order
app.post('/orders',(req,res)=>{
    const order = new Order({name: req.body.name, date: req.body.date,
                             order: req.body.order, email: req.body.email})
    order.save()
    .then(doc => res.json({message: 'Order has been saved'}))
    .catch(error => res.json({message: 'Error saving order'}))
})



// order UPDATE - update an order
app.put('/orders',(req,res)=>{
    res.json({"message" : "PUT /orders"})
})

// order DELETE - delete an order
app.delete('/orders',(req,res)=>{
    Order.findByIdAndDelete(req.body.id)
    .then(doc => res.json({message: 'Order has been deleted'}))
    .catch(error => res.json({message: 'Error deleting order'}))

})

// orders/email - get orders filter by email
app.post('/orders/email',(req,res)=>{
    res.json({"message" : "GET /orders/email"})
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080...")
})
