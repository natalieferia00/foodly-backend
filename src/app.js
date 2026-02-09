const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const planRoutes = require('./routes/planRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Definición de rutas
app.use('/api/plans', planRoutes);

app.get('/', (req, res) => {
  res.send('Foodly API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Servidor en puerto ${PORT}`));