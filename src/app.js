const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('../utils/geoCode');
const forecast = require('../utils/forecast');

const app = express();

// Define paths for Express Config 
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    })
});

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        imgSRC: 'assets/images/robot.png',
        name: 'Andrew Mead'
    })
});

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'This is a help text',
        name: 'Andrew Mead'
    })
});

app.get('/weather',(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term' 
        })
    }
    geoCode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast( latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });
});

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term' 
        })
    }
    res.send({
        products: []
    });
});

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Help Page Not Available',
        name: 'Andrew Mead'
    })
});

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Page Not Found',
        name: 'Andrew Mead'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});