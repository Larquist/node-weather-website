const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

// Setup the express app
const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// Setup handlers for url variations
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Travis Evans',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Travis Evans',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMsg: 'This is a help message.',
        name: 'Travis Evans',
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    // Error handling if no address is provided in the query
    if (!address) {
        return res.send({
            // Return exits the function so it doesn't run the code below the if statement
            error: 'Please provide an address!',
        })
    }

    geocode(address, (err, { latitude, longitude, location } = {}) => {
        // Error handling if geocode returns an error
        if (err) {
            return res.send({ error: err })
        }
        // Call to forcast with data aquired by geocode
        forcast(latitude, longitude, (err, forcastData) => {
            // Error handling if forcast returns an error
            if (err) {
                return res.send({ error: err })
            }
            // Return data as json
            res.send({
                forcast: forcastData,
                location,
                address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search term provided.',
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

// 404 handling
// Help specific 404 handling
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Help Article Not Found',
        error: '404 this help article cannot be found!',
        name: 'Travis Evans',
    })
})
// All other 404 handling
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Page Not Found',
        error: '404 this page does not exist!',
        name: 'Travis Evans',
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000.')
})
