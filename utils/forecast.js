const request = require('request');

const forecast = (latitude,longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=43dc818a2ef0e4c825600abb2d582143&query="+ encodeURIComponent(longitude)+','+ encodeURIComponent(latitude) +"&units=f";
    request({ url,json: true },(error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to Weather service', undefined);
        } else if (body.error) {
            callback('Unable to find Location, search another location', undefined);
        } else {
            const temp = body.current.temperature;
            const feelTemp = body.current.feelslike;
            const forecastString = body.current.weather_descriptions[0] + '. Its currently ' + temp + ' degrees out, but it feels like ' + feelTemp + ' degrees out.';
            callback(undefined, forecastString)
        }
    })
}

module.exports = forecast 