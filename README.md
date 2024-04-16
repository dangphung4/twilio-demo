# Twilio Demo Application

## Description

This project is a demonstration of Twilio's API capabilities, specifically focusing on voice API features, texting for conversations, and call recordings. The backend is built with Node.js and Express, serving API endpoints that integrate with Twilio services. The frontend is a React application powered by Vite, providing a user-friendly interface to interact with the Twilio features implemented.

## Project Structure

```
/twilio-demo
|-- /server         # Node Express server
|   |-- index.js    # Server entry point
|   `-- ...         # Additional server files
|   
|-- /src            # React client application
|   |-- /assets     # React pictures
|   |-- /pages      # React pages
|   |-- App.jsx     # React main app component
|   `-- main.jsx    # Client entry point
|
|-- .env
|-- index.html
`-- ...             # More files
`-- README.md       # Project documentation
```

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React, Vite
- **APIs**: Twilio Voice API, SMS and Messaging Services
- **Other Tools**:
  - `dotenv` for environment variable management
  - `ngrok` for exposing local servers to the internet
  - Proxy setup in Vite for API integration during development


## Setup Instructions

### Prerequisites

- Node.js and npm (Node package manager)
- Git (Optional, if cloning the repo)
- Ngrok account

### Installation

1. **Clone the repository (optional):**

```bash
git clone https://github.com/dangphung4/twilio-demo
cd twilio-demo
```

2. **Set up the app**

Install dependencies from the root directory.

```bash
npm install
```

3. **Environment Variables:**

Create a `.env` file in the root of the server directory and add the following environment variables:

```plaintext
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_SERVICE_SID=your_twilio_service_sid
TWILIO_API_KEY=your_twilio_api_key
TWILIO_API_SECRET=your_twilio_api_secret
TWILIO_PHONE_NUMBER=your_twilio_phone_number
YOUR_PHONE_NUMBER=your_personal_phone_number
TWILIO_APPLICATION_SID=your_twilio_application_sid
```

Ensure you replace the placeholder values with your actual Twilio API details and phone numbers.

### Twilio Console Configuration

- Log into the [Twilio Console](https://www.twilio.com/console).
- Navigate to the "Phone Numbers" section and select your number.
- Set the messaging and voice webhook URLs to your Ngrok URL (e.g., `https://<your-ngrok-url>.ngrok.io/api/messages` for messaging).

### Running the Application

1. **Start Ngrok:**
   ```bash
   ngrok http 3001
   ```
   - This command exposes port 3001 to the internet and provides you with a public URL.

2. **Update your Twilio webhook URLs:**
   - Copy the HTTPS URL provided by Ngrok and update your Twilio phone number’s webhook URLs to use it for incoming calls and messages.

3. **Start both the server and the client:**
   ```bash
   npm run dev
   ```
   - The server will run on [http://localhost:3001](http://localhost:3001).
   - The client will be available at [http://localhost:5173](http://localhost:5173) and proxies API requests to the server via the configured Vite proxy.

## Features

- **Voice API Integration**: Initiate voice calls via Twilio's Voice API.
- **Messaging and SMS**: Send and receive messages using Twilio's SMS features.
- **Call Recordings**: Manage and retrieve call recordings.