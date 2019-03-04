const express = require("express");
const birdRoutes = express.Router();
const BirdSearch = require("../models/BirdSearch");
const axios = require("axios");

birdRoutes.post("/", (req, res, next) => {
  console.log("req.body.searchName: ",req.body.searchName)
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
          console.log("answer.data: ",answer.data);
          return answer.data;
        })
        .then(data => BirdSearch.create(data)) //<--- include "searchName: req.body.searchName"
        .then(data => res.status(200).json(data))

        .catch(err => {
          return res.status(500).json(err);
        });
    }
  }
  getData();
});

module.exports = birdRoutes;