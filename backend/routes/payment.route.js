import express from 'express';
import axios from 'axios';

const router = express.Router();

// Route to initialize payment
router.post('/initialize', async (req, res) => {
  try {
    const { email, amount, paymentMethod, phone, provider } = req.body;

    if (paymentMethod === 'card') {
      // Handle card payment
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount, // Use KES directly
          currency: 'KES',
          channels: ['card', 'mobile_money'], // Include mobile money as an option
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      res.status(200).json(response.data);
    } else if (paymentMethod === 'mpesa') {
      // Handle M-Pesa payment
      const response = await axios.post(
        'https://api.paystack.co/charge',
        {
          amount, // Use KES directly
          email,
          currency: 'KES', // Use appropriate currency for M-Pesa
          mobile_money: {
            phone,
            provider,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json(response.data);
    } else {
      res.status(400).json({ error: 'Invalid payment method' });
    }
  } catch (error) {
    console.error('Payment Initialization Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to initialize payment' });
  }
});

export default router;
