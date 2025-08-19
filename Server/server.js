const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI, {
  
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

const DB_URI = 'mongodb+srv://jitendraumore99:0wy73T6HU7ahAkIL@animecom.ukiff.mongodb.net/responseDB?retryWrites=true&w=majority';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

const responseSchema = new mongoose.Schema({
  answer: String,
  timestamp: { type: Date, default: Date.now }
});

const Response = mongoose.model('Response', responseSchema);

// API Routes
app.post('/api', async (req, res) => {
  try {
    const { answer } = req.body;
    console.log(answer);
    
    if (!answer || (answer !== 'Yes' && answer !== 'No')) {
      return res.status(400).json({ error: 'Invalid answer' });
    }

    const newResponse = new Response({ answer });
    await newResponse.save();

    res.status(201).json({ message: 'Response saved successfully' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/responses', async (req, res) => {
  try {
    const responses = await Response.find().sort({ timestamp: -1 });
    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});