import twilio from "twilio";
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const serviceSid = process.env.TWILIO_SERVICE_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const yourPhoneNumber = process.env.YOUR_PHONE_NUMBER;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const applicationSid = process.env.TWILIO_APPLICATION_SID;

export {applicationSid, client, serviceSid, apiKey, apiSecret, yourPhoneNumber, twilioPhoneNumber, accountSid, authToken};