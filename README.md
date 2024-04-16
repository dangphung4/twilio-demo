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
  - Proxy setup in Vite for API integration during development

## Setup Instructions

### Prerequisites

- Node.js and npm (Node package manager)
- Git (Optional, if cloning the repo)

### Installation

1. **Clone the repository (optional):**

```bash
git clone https://github.com/dangphung4/twilio-demo
cd twilio-demo
```

2. **Set up the server:**

Navigate to the server directory and install dependencies.

```bash
cd server
npm install
```

3. **Set up the client:**

Navigate to the client directory (from the root of the project) and install dependencies.

```bash
cd src
npm install
```

4. **Environment Variables:**

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

### Running the Application

1. **Start the server:**

From the server directory:

```bash
npm start
```

The server will run on [http://localhost:3001](http://localhost:3001).

2. **Start the client:**

From the client (src) directory:

```bash
npm run dev
```

The client will be available at [http://localhost:3000](http://localhost:3000) and proxies API requests to the server via the configured Vite proxy.

## Features

- **Voice API Integration**: Initiate voice calls via Twilio's Voice API.
- **Messaging and SMS**: Send and receive messages using Twilio's SMS features.
- **Call Recordings**: Manage and retrieve call recordings.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Ensure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

Feel free to customize this README based on the specifics of your project or any additional details you would like to include.