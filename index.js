const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DressStore application.' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yoyohohoh:Yob1718N925@cluster0.apmkivg.mongodb.net/TicketingSystem?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categoriesRoutes = require('./routes/categoriesRoutes');
const eventCategoriesRoutes = require('./routes/eventCategoryRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const orderItemsRoutes = require('./routes/orderItemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const venuesRoutes = require('./routes/venueRoutes');

app.use(categoriesRoutes);
app.use(eventCategoriesRoutes);
app.use(eventsRoutes);
app.use(orderItemsRoutes);
app.use(orderRoutes);
app.use(paymentRoutes);
app.use(ticketRoutes);
app.use(userRoutes);  
app.use(venuesRoutes);