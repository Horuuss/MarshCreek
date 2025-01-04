
const express = require('express');
const app = express();  /// can use app  from here on in
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const Beef = require('./models/beef');  // bring in schema
const Stock = require('./models/stock');  // bring in schema

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());
//const dbUrl = "mongodb+srv://mdinsmore:7FPHAe2IWNm155WW@cluster0.y3p3x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//console.log(dbUrl);
//mongoose.connect(dbUrl, { 
mongoose.connect('mongodb://127.0.0.1:27017/marshcreek', {  
 //   useNewUrlParser: true,
 //   UseUnifiedTopology: true
});  /// connect to mongo db marshcreek

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  //so we can 'views' from anywhere//

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/Belties', (req, res) => {
    res.render('belties');
})

app.get('/Beefinq', (req, res) => {
    res.render('inq/beefinq');
})

app.get('/Beefinq/notes', async (req, res) => {
     const beefinqs = await Beef.find({});
    res.render('inq/beefnotes', {beefinqs} );
})

app.get('/Stockinq/notes', async (req, res) => {
    const stockinqs = await Stock.find({});
    res.render('inq/stocknotes', {stockinqs});
})

app.get('/Stockinq', (req, res) => {
    res.render('inq/stockinq');
})

app.get('/Thanks', (req, res) => {
    res.render('inq/thank');
})

app.post('/Beefinq', async (req , res) => {
    const beefNot = new Beef(req.body.beefinq)
    await beefNot.save();
    req.flash('success', 'Thanks for the note, see you soon.');
    res.redirect('/Beefinq');
});

app.post('/Stockinq', async (req , res) => {
    const StockNot = new Stock(req.body.stockinq)
    await StockNot.save();
    req.flash('success', 'Out feeding. Be back soon');
    res.redirect('/Stockinq');
});

app.get('/Beefinq/:id', async (req, res) => {
    const beefNot = await Beef.findById(req.params.id);
    res.render('inq/beefshow', {beefNot});
});

app.get('/Stockinq/:id', async (req, res) => {
    const stockNot = await Stock.findById(req.params.id);
    res.render('inq/stockshow', {stockNot});
});

app.delete('/Beefinq/:id', async (req, res) => {
    const { id } = req.params;
    await Beef.findByIdAndDelete(id);
    res.redirect('/Beefinq/notes');
})

app.delete('/Stockinq/:id', async (req, res) => {
    const { id } = req.params;
    await Stock.findByIdAndDelete(id);
    res.redirect('/Stockinq/notes');
})


app.listen(3000, () => {
    console.log('Listening')
})