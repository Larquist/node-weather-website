const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url =
        'http://api.weatherstack.com/current?access_key=4ce59a9193c3e3d57a1b28a39c2bb16e&query=' +
        encodeURIComponent(latitude) +
        ',' +
        encodeURIComponent(longitude)

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.error) {
            console.log(body.error)
            callback(
                'Unable to find forcast location. Try another search term.',
                undefined
            )
        } else {
            const msg =
                body.current.weather_descriptions[0] +
                '. It is currently ' +
                body.current.temperature +
                ' degrees out. It feels like ' +
                body.current.feelslike +
                ' degrees out.'
            callback(undefined, msg)
        }
    })
}

module.exports = forecast
