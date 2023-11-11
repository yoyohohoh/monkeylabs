const Orders = require('../models/Order');

const getAllOrders = async (req, res) => {
  var keyword = req.query.name;

  if (keyword == null) {
    try {
      const orders = await Orders.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  else {
    try {
      keyword = keyword.replace('[', '').replace(']', '').trim();
      const orders = await Orders.find({
        name: { $regex: keyword, $options: 'i' }
      });

      res.status(200).json(orders);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching orders.' });
    }
  }
};

const getOrderById = async (req, res) => {
  const ordersId = req.params.id;

    try {
        const orders = await Orders.findById(ordersId);
        
        if (!orders) {
            return res.status(404).json({ message: 'Orders not found.' });
        }

        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching orders.' });
    }
};

const createOrder = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newOrders = new Orders({
          user_id,
          order_date,
          total_price
        });

        const savedOrders = await newOrders.save();

        res.status(201).json(savedOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding orders.' });
    }
};

const updateOrder = async (req, res) => {
  const ordersId = req.params.id;

  try {
      const updatedOrders = await Orders.findByIdAndUpdate(ordersId, req.body, { new: true, runValidators: true });
      
      if (!updatedOrders) {
          return res.status(404).json({ message: 'Orders not found.' });
      }

      res.status(200).json(updatedOrders);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating orders.' });
  }
};

const deleteOrderById = async (req, res) => {
  const ordersId = req.params.id;

  try {
      const orders = await Orders.findByIdAndDelete(ordersId);
      
      if (!orders) {
          return res.status(404).json({ message: 'Orders not found.' });
      }

      res.status(200).json({ message: 'Orders successfully deleted.', deletedOrders: orders });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting orders.' });
  }
};

const deleteAllOrders = async (req, res) => {
  try {
      const orders = await Orders.deleteMany({});
      res.status(200).json({ message: 'All orders successfully deleted.', deletedOrders: orders });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting orders.' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrderById,
  deleteAllOrders
}