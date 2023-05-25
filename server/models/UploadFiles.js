// const mongoose = require('mongoose');

// const uploadFilesSchema = new mongoose.Schema({
//     // field_name: {
//     //   type: String,
//     //   required: true
//     // },
//     // file_name: {
//     //   type: String,
//     //   required: true
//     // },
//   file: {
//     data: Buffer,
//     content_type: String,
//     required: true
//   },
// //   path: {
// //     type: String,
// //     required: true
// //   },
  
// });

// const UploadFiles = mongoose.model('UploadFiles', uploadFilesSchema);

// module.exports = UploadFiles;


const mongoose = require('mongoose');

const uploadFilesSchema = new mongoose.Schema({
  file_name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  thumbUrl: { type : String }, 
});

const UploadFiles = mongoose.model('UploadFiles', uploadFilesSchema);

module.exports = UploadFiles;
