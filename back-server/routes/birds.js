const express = require("express");
const birdRoutes = express.Router();
const axios = require("axios");

birdRoutes.get("/", (req, res, next)=> {
  let birdArray = [];
  
  function getData(){
    for (let i = 0; i < 2; i++){
      axios({
        method:'get',
        url:`https://ebird.org/ws2.0/data/obs/ES/historic/1995/1/${i}?rank=mrec&detail=full&cat=species`,
        // responseType:'stream'
        headers: {
          'X-eBirdApiToken': 'on81na84d12p'
        }
      })
      .then(answer=> {
        birdArray.push(answer);
        console.log("birdArray: ", birdArray[0].data[0])
      })
    .catch(err =>{
      console.log("there was an error", err)
    })
    }
  }

Promise.all([getData()]).then(console.log(birdArray))

})

module.exports = birdRoutes;