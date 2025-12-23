const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

const mongoURI = 'mongodb+srv://ansslucky07_:anss12345@project1.bxrpzwp.mongodb.net/project1?retryWrites=true&w=majority&appName=project1';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});