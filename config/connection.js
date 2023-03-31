const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialmedia', {
    // connect('mongodb://localhost/postsTags', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection 
module.exports = mongoose.connection;
