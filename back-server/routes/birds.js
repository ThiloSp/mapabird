const express = require("express");
const birdRoutes = express.Router();
const BirdSearch = require("../models/BirdSearch");
const axios = require("axios");

birdRoutes.post("/", (req, res, next) => {
  // console.log("req.body.searchName: ",req.body.searchName)
  const searchNameConst = req.body.searchName;
  const species = req.body.species;
  const month = req.body.month;
  const year = req.body.year;

  function getData() {
    const reqArray = [];
    const countries = [ "ES", "PT" ];
/* "AD", "AT", "BE", "CH", "CZ", "DK", "EE",  "ES", "PT", "NO", "SE", "SI", "DE", "FI", "FO",  "FR", "GB", "IT", "LU", "NL" */
    // countries.forEach(country => {
    //   if (month === "April" || "June" || "September" || "November") {
    //     for (let i = 1; i <= 30; i++) {
    //       let service = axios.create({
    //         baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
    //         // responseType:'stream'
    //         headers: {
    //           "X-eBirdApiToken": process.env.eBirdAPIKey
    //         }
    //       });
    //       reqArray.push(service.get());
    //     }
    //   } else if (
    //     month === "January" ||
    //     "March" ||
    //     "May" ||
    //     "July" ||
    //     "August" ||
    //     "October" ||
    //     "December"
    //   ) {
    //     /* (month === 4 || 6 || 9 || 11) */ for (let i = 1; i <= 31; i++) {
    //       let service = axios.create({
    //         baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
    //         // responseType:'stream'
    //         headers: {
    //           "X-eBirdApiToken": process.env.eBirdAPIKey
    //         }
    //       });
    //       reqArray.push(service.get());
    //     }
    //   } else {
    //     for (let i = 1; i <= 28; i++) {
    //       let service = axios.create({
    //         baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
    //         // responseType:'stream'
    //         headers: {
    //           "X-eBirdApiToken": process.env.eBirdAPIKey
    //         }
    //       });
    //       reqArray.push(service.get());
    //     }
    //   }
    // });

    countries.forEach(country => {
      if (month === 4 || 6 || 9 || 11) {
        for (let i = 1; i <= 30; i++) {
          let service = axios.create({
            baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
            // responseType:'stream'
            headers: {
              "X-eBirdApiToken": process.env.eBirdAPIKey
            }
          });
          reqArray.push(service.get());
        }
      } else if (month === 1 || 3 || 5 || 7 || 8 || 10 || 12) {
        /* (month === 4 || 6 || 9 || 11) */ for (let i = 1; i <= 31; i++) {
          let service = axios.create({
            baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
            // responseType:'stream'
            headers: {
              "X-eBirdApiToken": process.env.eBirdAPIKey
            }
          });
          reqArray.push(service.get());
        }
      } else if (month === 2) {
        for (let i = 1; i <= 15; i++) {
          let service = axios.create({
            baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
            // responseType:'stream'
            headers: {
              "X-eBirdApiToken": process.env.eBirdAPIKey
            }
          });
          reqArray.push(service.get());
        }
      }
    });

    Promise.all(reqArray)
      .then(answer => {
        const array = [];
        answer.forEach(e => array.push(...e.data));
        // console.log("answer.data: ",answer.data);
        return array;
      })
      .then(data => {
        // console.log("this is data: ", data);
        var dataFiltered = data.filter(oneData => {
          return oneData.sciName === species;
        });
        // console.log("this is dataFiltered", dataFiltered);
        let promiseArray = [];
        for (let k = 0; k < dataFiltered.length; k++) {
          dataFiltered[k].searchName = searchNameConst;
        }
        promiseArray.push(BirdSearch.create(dataFiltered));
        return Promise.all(promiseArray).then(data => data);
      })
      .then(data => {
        const xArray = [];
        data.forEach(e => xArray.push(...e));
        // console.log("data to send back",data)
        return res.status(200).json(xArray);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  }
  getData();
});

birdRoutes.post("/threadbirds", (req, res, next) => {
  console.log("req.body: ", req.body);
  BirdSearch.find({ searchName: req.body.searchName }).then(birds => {
    console.log("this is birds: ", birds.data);
    console.log("this is birds.length: ", birds.length);
    res.json(birds);
  });
});

module.exports = birdRoutes;
