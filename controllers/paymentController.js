const Payments = require('../models/Payment');

const getAllPayments = async (req, res) => {
  var keyword = req.query.name;

  if (keyword == null) {
    try {
      const payments = await Payments.find();
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  else {
    try {
      keyword = keyword.replace('[', '').replace(']', '').trim();
      const payments = await Payments.find({
        name: { $regex: keyword, $options: 'i' }
      });

      res.status(200).json(payments);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching payments.' });
    }
  }
};

const getPaymentById = async (req, res) => {
  const paymentsId = req.params.id;

    try {
        const payments = await Payments.findById(paymentsId);
        
        if (!payments) {
            return res.status(404).json({ message: 'Payments not found.' });
        }

        res.status(200).json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching payments.' });
    }
};

const createPayment = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newPayments = new Payments({
          order_id,
          payment_date,
          payment_status
        });

        const savedPayments = await newPayments.save();

        res.status(201).json(savedPayments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding payments.' });
    }
};

const updatePayment = async (req, res) => {
  const paymentsId = req.params.id;

  try {
      const updatedPayments = await Payments.findByIdAndUpdate(paymentsId, req.body, { new: true, runValidators: true });
      
      if (!updatedPayments) {
          return res.status(404).json({ message: 'Payments not found.' });
      }

      res.status(200).json(updatedPayments);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating payments.' });
  }
};

const deletePaymentById = async (req, res) => {
  const paymentsId = req.params.id;

  try {
      const payments = await Payments.findByIdAndDelete(paymentsId);
      
      if (!payments) {
          return res.status(404).json({ message: 'Payments not found.' });
      }

      res.status(200).json({ message: 'Payments successfully deleted.', deletedPayments: payments });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting payments.' });
  }
};

const deleteAllPayments = async (req, res) => {
  try {
      const payments = await Payments.deleteMany({});
      res.status(200).json({ message: 'All payments successfully deleted.', deletedPayments: payments });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting payments.' });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePaymentById,
  deleteAllPayments
}