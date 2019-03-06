const axios = require("axios")
const DBURL = "mongodb://localhost/mapabird"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = Promise;
mongoose
    .connect(DBURL)
    .then(() => {
        console.log(`Connected to Mongo on ${DBURL}`)
    }).catch(err => {
        console.error('Error connecting to mongo', err)
    });

const birdSchema = new Schema({},
    {
        strict: false
    });

const Bird = mongoose.model('Bird', birdSchema);

function requestDay(day, month, year, country) {
    var eBirdAPIKey = "on81na84d12p"

    let service = axios.create({
        baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${day}?rank=mrec&detail=full&cat=species`,
        headers: {
            "X-eBirdApiToken": eBirdAPIKey
        }
    });

    service.get("").then((bird) => {
        console.log(`Retrieving day ${day} ${month} ${year}`)
        bird.data.forEach((b) => {
            var bb = new Bird(b)
            
            bb.save()
        })
    })
}

var start = new Date("2018/1/1"),
    end = new Date("2018/12/31"),
    year = start.getFullYear(),
    month = start.getMonth()
    day = start.getDate(),
    dates = [start];

while(dates[dates.length-1] < end) {
  dates.push(new Date(year, month, ++day));
}

dates.forEach((day) =>{
    requestDay(day.getDate(), day.getMonth() + 1, day.getFullYear(), "ES")
})