const express = require('express');
const uploads  = express.Router();
const uploader = require('../configs/cloudinary-setup');

uploads.post('/upload', uploader.single("photoPath"), (req, res, next) => {
    console.log('file is: ', req.file)
    console.log('URL is: ', req.file.secure_url)
    console.log('userID: ', req.body)
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})

// router.post('/update', (req, res, next) => {
//   if (req.isAuthenticated()) {
//     const imageUrl = req.body.imageUrl;
//     User.findOneAndUpdate({_id: req.user._id}, { $set: { imageUrl: imageUrl }}, {new:true})
//       .then((updateUser) => {
//         res.status(200).json(updateUser);
//       });
//   }
// });

module.exports = uploads;