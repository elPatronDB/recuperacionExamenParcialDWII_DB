// server.js
import express from 'express';
import dotenv from 'dotenv';
import mochilaRoutes from './routes/mochila.route.js';

dotenv.config();

const app = express()
const port = process.env.PORT;



app.use(express.json());
app.use('/mochilas', mochilaRoutes);

app.get('/', (req, res) => {
  res.send('API Mochilas Diego Bran');
});

app.listen(port, () => {
  console.log(`Servidor iniciado ${port}`)
})


