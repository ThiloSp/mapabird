const express = require("express");
const birdRoutes = express.Router();
const axios = require("axios");

birdRoutes.get("/", (req, res, next) => {
  let birdArray = [];
  function getData() {
    for (let i = 0; i < 2; i++) {
      const service = axios.create({
        // method: "get",
        baseURL: `https://ebird.org/ws2.0/data/obs/ES/historic/1995/1/${i}?rank=mrec&detail=full&cat=species`,
        // responseType:'stream'
        headers: {
          // 'X-eBirdApiToken': 'on81na84d12p'
          "X-eBirdApiToken": process.env.eBirdAPIKey
        }
      })

      service.get()
        .then(answer => {
          birdArray.push(...answer.data);
          // console.log("birdArray: ", birdArray[0].data[0]);
          console.log(birdArray);
          return res.status(200).json(answer.data)
        })
        .catch(err => {
          return res.status(500).json(err)
          // console.log('----------',"there was an error", err);
        });
      }
  }
  getData();
  // Promise.all([getData()]).then(console.log(birdArray))
});

module.exports = birdRoutes;
