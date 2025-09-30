// backend/db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/to-do-app', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('✅ MongoDB connected to to-do-app');
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error.message);
//     process.exit(1); // Exit the app if connection fails
//   }
// };

// module.exports = connectDB;







const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas connection from environment variable
    const mongoURI = process.env.MONGO_URI;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected to Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit the app if connection fails
  }
};

module.exports = connectDB;

