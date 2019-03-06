const axios = require("axios")
const DBURL = "mongodb://localhost/mapabird"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var start = new Date("2013/1/1"),
    end = new Date("2013/12/31"),
    year = start.getFullYear(),
    month = start.getMonth()
day = start.getDate(),
    dates = [start];

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
        var totalElements = bird.data.length
        var cElem = 0

        bird.data.forEach((b) => {
            var bb = new Bird(b)

            bb.save(function () {
                cElem++

                if (cElem === totalElements) {
                    var newDate = dates.shift()

                    if (newDate !== undefined) {
                        requestDay(newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear(), "ES")
                    } else {
                        console.log("no more days to check!")
                        process.exit(0)
                    }
                }
            })
        })
    })
}



while (dates[dates.length - 1] < end) {
    dates.push(new Date(year, month, ++day));
}


requestDay(dates[0].getDate(), dates[0].getMonth() + 1, dates[0].getFullYear(), "ES")