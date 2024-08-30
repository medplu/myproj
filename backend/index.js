import express from 'express';
import dotenv from 'dotenv';
import http from 'http'; // Import http module
import socketIo from 'socket.io'; // Import socket.io
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import notificationRoutes from './routes/notification.route.js';
import doctorRoutes from './routes/doctor.route.js';
import appointmentRoutes from './routes/appointment.route.js';
import scheduleRoutes from './routes/schedule.route.js';
import paymentRoutes from './routes/payment.route.js';
import prescriptionRoutes from './routes/prescription.route.js'; // Import the prescription route
import connectMongoDB from '../db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Initialize socket.io with the HTTP server

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost') || origin === 'http://localhost:8100') {
      callback(null, true); // Allow localhost and localhost:8100
    } else {
      callback(new Error('Not allowed by CORS')); // Deny other origins
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/payments', paymentRoutes); // Register the payment route
app.use('/api/prescriptions', prescriptionRoutes); // Register the prescription route

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Function to emit new appointment notifications
const notifyNewAppointment = (appointment) => {
  io.emit('newAppointment', appointment);
};

// Example function to handle appointment creation
app.post('/api/appointments', async (req, res) => {
  const { name, phone, email, gender, age, Date, doctorId, userId, time } = req.body;

  if (!name) return res.status(400).json({ message: 'Missing name field' });
  if (!phone) return res.status(400).json({ message: 'Missing phone field' });
  if (!email) return res.status(400).json({ message: 'Missing email field' });
  if (!gender) return res.status(400).json({ message: 'Missing gender field' });
  if (!age) return res.status(400).json({ message: 'Missing age field' });
  if (!Date) return res.status(400).json({ message: 'Missing Date field' });
  if (!doctorId) return res.status(400).json({ message: 'Missing doctorId field' });
  if (!userId) return res.status(400).json({ message: 'Missing userId field' });
  if (!time) return res.status(400).json({ message: 'Missing time field' });

  try {
    const appointment = new Appointment({
      name,
      phone,
      email,
      gender,
      age,
      Date,
      doctor_id: doctorId,
      user_id: userId,
      time,
      status: 'new'
    });

    await appointment.save();

    // Notify via WebSocket
    notifyNewAppointment(appointment);

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectMongoDB();
});
