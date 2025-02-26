require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const casaDb = require('./util/db')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // You can specify your mobile app URL here for better security.
}));

// Routes
app.use('/api/drivers', require('./routes/authRoute'));
app.use('/api/drivers', require('./routes/profileRoute'));
app.use('/api/drivers', require('./routes/tripRoute'));
app.use('/api/drivers', require('./routes/locationRoute'));
app.use('/api/drivers', require('./routes/earningRoute'));
app.use('/api/drivers', require('./routes/notificationRoute'));



// Connect to MongoDB
casaDb()

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});