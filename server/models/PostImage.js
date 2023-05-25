const mongoose = require('mongoose');

const PostImageSchema = new mongoose.Schema({
  myFile : { type: String }
});

const PostImage = mongoose.model('PostImage', PostImageSchema);

module.exports = PostImage;
