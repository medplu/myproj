import express from 'express';
import dotenv from 'dotenv';
import { google } from 'googleapis'; // Import Google API
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
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

dotenv.config(); // Ensure this is called at the very beginning

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: '*', // Allow all origins temporarily
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

// Log environment variables to verify they are loaded correctly
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('SECRET_KEY:', process.env.SECRET_KEY);
console.log('REDIRECT_URI:', process.env.REDIRECT_URI);

// Configure OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.SECRET_KEY,
  process.env.REDIRECT_URI // Ensure this is correctly set
);

// Endpoint to initiate OAuth flow
app.get('/api/auth/google', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/calendar'];
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
    redirect_uri: process.env.REDIRECT_URI // Make sure this matches your Google Cloud Console
  });
  res.redirect(authUrl);
});

// Endpoint to handle OAuth2 callback
app.post('/api/auth/google/callback', async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // Generate a token for your application
    const appToken = generateAppToken(tokens);
    res.json({ token: appToken, redirectUrl: '/' });
  } catch (error) {
    console.error('Error during OAuth2 callback:', error);
    res.status(500).json({ message: 'OAuth2 callback error' });
  }
});

function generateAppToken(tokens) {
  // Implement your token generation logic here
  const payload = {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiryDate: tokens.expiry_date,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Example function to create a new calendar event
app.post('/create-calendar-event', async (req, res) => {
  const { summary, location, description, startTime, endTime } = req.body;

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const event = {
    summary,
    location,
    description,
    start: { dateTime: startTime },
    end: { dateTime: endTime },
  };

  try {
    const eventResponse = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    res.status(201).json(eventResponse.data);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).json({ message: 'Error creating calendar event' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectMongoDB();
});
