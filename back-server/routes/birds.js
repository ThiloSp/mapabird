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
    for (let i = 1; i <= 1; i++) {
      let service = axios.create({
        baseURL: `https://ebird.org/ws2.0/data/obs/ES/historic/${year}/${month}/${i}?rank=mrec&detail=full&cat=species`,
        // responseType:'stream'
        headers: {
          "X-eBirdApiToken": process.env.eBirdAPIKey
        }
      });
      service
        .get()
        .then(answer => {
          // console.log("answer.data: ",answer.data);
          return answer.data;
        })
        .then(data => {
          // console.log("this is data: ", data);
          var dataFiltered = data.filter(oneData => {
            return oneData.sciName === species;
          });
          // console.log("this is dataFiltered", dataFiltered);
          const promiseArray = [];
          for (let i = 0; i < dataFiltered.length; i++) {
            dataFiltered[i].searchName = searchNameConst;
            promiseArray.push(BirdSearch.create(dataFiltered));
          }
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
  }
  getData();
});

module.exports = birdRoutes;
