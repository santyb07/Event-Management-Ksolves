const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config();
const app = express();
const eventRoutes = require('./routes/eventRoutes');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api',eventRoutes);


const username =process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.i99pg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log("MongoDB Connected..."))
.catch((err)=>console.log("Mongodb Error...",err))

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



