const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json());
app.use(cors());

console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const emailSchema = new mongoose.Schema({ email: String });
const Email = mongoose.model('Email', emailSchema);

app.post('/subscribe', async(req, res) => {
  const { email } = req.body;
  const newEmail = new Email({ email });
  await newEmail.save();
  res.status(201).send('Email saved');
});

const sendSummaries = async() => {
  const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_API_KEY}`);
  const summaries = response.data.results.map(article=>article.title).join('\n');

  const emails = await Email.find({});
  emails.forEach(({ email }) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'briefly NYT summary',
      text: summaries,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        console.log('Error sending email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  });
};

// Schedule the sendSummaries function to run every day at 8 AM PST
cron.schedule('0 8 * * *', () => {
  console.log('Running sendSummaries at 8 AM PST');
  sendSummaries();
}, {
  scheduled: true,
  timezone: "America/Los_Angeles"
});

// Temporary endpoint to trigger the sendSummaries function manually
app.get('/send-test-email', async (req, res) => {
  try {
    await sendSummaries();
    res.status(200).send('Test email sent');
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).send('Error sending test email');
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});