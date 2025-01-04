const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    first: String,
    last: String,
    email: String,
    zip: Number,
    note: String
})
/// next line initiates

module.exports = mongoose.model('Stock', StockSchema); 
