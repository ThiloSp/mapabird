const express = require("express");
const birdRoutes = express.Router();
const BirdSearch = require("../models/BirdSearch");
const Bird = require("../models/Bird");

birdRoutes.post("/", (req, res, next) => {
  // console.log("req.body.searchName: ", req.body.searchName);
  // console.log("req.body.search: ", req.body.search);
  const searchNameConst = req.body.searchName;
  const species = req.body.species;
  const month = req.body.month;
  // console.log("month: ", month);
  const year = req.body.year;
  // console.log("year: ", year);
  const search = req.body.search;
  Bird.find({
    $and: [
      { sciName: req.body.species },
      { obsDt: { $regex: `${year}` } },
      { obsDt: { $regex: `-${month}-` } }
    ]
  })
    .then(data => {
      // console.log("this is data: ", data);
      return data.map(e => e.toJSON());
    })
    .then(data => {
      // console.log("this is data: ", data);
      let promiseArray = [];
      for (let k = 0; k < data.length; k++) {
        // console.log(typeof data[k])
        data[k].searchName = searchNameConst;
        data[k].search = search;
      }
      promiseArray.push(BirdSearch.create(data));
      return Promise.all(promiseArray)
        .then(data => data)
        .catch(err => console.log(err));
    })
    .then(data => {
      const xArray = [];
      data.forEach(e => xArray.push(...e));
      console.log("data to send back",data)
      return res.status(200).json(xArray);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

birdRoutes.post("/threadbirds", (req, res, next) => {
  // console.log("req.body: ", req.body);
  BirdSearch.find({ searchName: req.body.searchName }).then(birds => {
    // console.log("this is birds: ", birds.data);
    res.json(birds);
  });
});

birdRoutes.get("/birdnames", (req, res) => {
  Bird.find().distinct("sciName", function(error, elems) {
    var sorted = elems.sort(function(a, b) {
      if (a > b) return -1;
      if (a < b) return 1;
    });
    res.json(sorted);
  });
});

module.exports = birdRoutes;

// const axios = require("axios");

// birdRoutes.post("/", (req, res, next) => {
//   console.log("req.body.searchName: ",req.body.searchName)
//   console.log("req.body.search: ",req.body.search)
//   const searchNameConst = req.body.searchName;
//   const species = req.body.species;
//   const month = req.body.month;
//   const year = req.body.year;
//   const search = req.body.search

//   function getData() {
//     const reqArray = [];
//     const countries = [ "ES", "PT" ];
// /* "AD", "AT", "BE", "CH", "CZ", "DK", "EE",  "ES", "PT", "NO", "SE", "SI", "DE", "FI", "FO",  "FR", "GB", "IT", "LU", "NL" */

//     countries.forEach(country => {
//       if (month === 4 || 6 || 9 || 11) {
//         for (let i = 1; i <= 30; i++) {
//           let service = axios.create({
//             baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
//             // responseType:'stream'
//             headers: {
//               "X-eBirdApiToken": process.env.eBirdAPIKey
//             }
//           });
//           reqArray.push(service.get());
//         }
//       } else if (month === 1 || 3 || 5 || 7 || 8 || 10 || 12) {
//         /* (month === 4 || 6 || 9 || 11) */ for (let i = 1; i <= 31; i++) {
//           let service = axios.create({
//             baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
//             // responseType:'stream'
//             headers: {
//               "X-eBirdApiToken": process.env.eBirdAPIKey
//             }
//           });
//           reqArray.push(service.get());
//         }
//       } else if (month === 2) {
//         for (let i = 1; i <= 15; i++) {
//           let service = axios.create({
//             baseURL: `https://ebird.org/ws2.0/data/obs/${country}/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
//             // responseType:'stream'
//             headers: {
//               "X-eBirdApiToken": process.env.eBirdAPIKey
//             }
//           });
//           reqArray.push(service.get());
//         }
//       }
//       console.log("This is reqArray: ",reqArray)
//     });

//     Promise.all(reqArray)
//       .then(answer => {
//         const array = [];
//         answer.forEach(e => array.push(...e.data));
//         console.log("answer.data: ",answer.data);
//         return array;
//       })
//       .then(data => {
//         // console.log("this is data: ", data);
//         var dataFiltered = data.filter(oneData => {
//           return oneData.sciName === species;
//         });
//         // console.log("this is dataFiltered", dataFiltered);
//         let promiseArray = [];
//         for (let k = 0; k < dataFiltered.length; k++) {
//           dataFiltered[k].searchName = searchNameConst;
//           dataFiltered[k].search = search;
//         }
//         promiseArray.push(BirdSearch.create(dataFiltered));
//         return Promise.all(promiseArray).then(data => data);
//       })
//       .then(data => {
//         const xArray = [];
//         data.forEach(e => xArray.push(...e));
//         // console.log("data to send back",data)
//         return res.status(200).json(xArray);
//       })
//       .catch(err => {
//         return res.status(500).json(err);
//       });
//   }
//   getData();
// });

//______________________________________________________
