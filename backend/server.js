const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const PORT  = process.env.PORT || 5000

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');

app.use('/api/auth',authRoutes);
app.use('/api/properties', propertyRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=> console.log('Mongodb Connected')).catch(err => console.log(err));

app.listen(PORT,() =>{
    console.log(`Server ${PORT}`);
})
