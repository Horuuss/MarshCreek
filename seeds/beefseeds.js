const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Beef = require('../models/beef');  //bring in beef schema

mongoose.connect('mongodb://127.0.0.1:27017/marshcreek', {
 //   useNewUrlParser: true,
 //   UseUnifiedTopology: true
});  //now connected to marshcreek db

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Beef.deleteMany({});
    let dum = new Beef({first: 'Ray', last: 'Suiter', 
        email: 'rsuiterz@yahoo.com', zip: 23109,
        note: 'I am Dead' });
    await dum.save();
    dum = new Beef({first: 'Sue', last: 'Suiter', 
        email: 'ssuiterz@yahoo.com', zip: 23109,
        note: 'Dead too' });
    await dum.save();
    dum = new Beef({first: 'Jay', last: 'Doe', 
        email: 'jdoez@yahoo.com', zip: 23119,
        note: 'Dead to you' });
    await dum.save();
}

seedDB();