# ScopeGuard Chrome Extension

AI-powered scope creep detection for freelancers using Gmail integration.

## Features

- 🔐 **Gmail Integration**: Connect to your Gmail account securely
- 🤖 **AI Analysis**: Uses Groq's Llama 3.1 model for intelligent scope creep detection
- 📧 **Smart Filtering**: Automatically filters out promotional emails
- 🚪 **Account Management**: Easy logout and account switching
- 📊 **Real-time Analysis**: Analyze your latest emails instantly

## Setup Instructions

### 1. Install the Extension

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the `scopeguard-extension` folder

### 2. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Chrome extension" as application type
6. Get your Extension ID from `chrome://extensions/`
7. Copy the generated Client ID
8. Update `manifest.json` with your Client ID:
   ```json
   "oauth2": {
     "client_id": "YOUR_CLIENT_ID.apps.googleusercontent.com"
   }
   ```

### 3. Get Groq API Key

1. Go to [Groq Console](https://console.groq.com/)
2. Create a free account (no credit card required)
3. Go to "API Keys" section
4. Click "Create API Key"
5. Copy the API key (starts with `gsk_`)
6. In the extension, click "🔑 Setup API Key" and paste your key

### 4. Use the Extension

1. Click the ScopeGuard extension icon
2. Click "Connect Gmail" to authenticate
3. Click "Analyze Latest Emails" to start AI analysis
4. View results with scope creep detection

## How It Works

1. **Email Fetching**: Retrieves your latest unread emails from Gmail
2. **Smart Filtering**: Excludes promotional emails and spam
3. **AI Analysis**: Sends relevant emails to Groq's Llama 3.1 model
4. **Scope Creep Detection**: AI determines if emails contain scope creep requests
5. **Results Display**: Shows analyzed emails with confidence levels and suggested responses

## Privacy & Security

- 🔒 **Read-only Access**: Extension only reads emails, never sends or modifies
- 🔐 **Local Storage**: API keys stored locally in browser
- 🚫 **No Data Collection**: No personal data sent to external servers
- 🔑 **Secure Authentication**: Uses Google OAuth 2.0

## Troubleshooting

### "Not authenticated" Error
- Click the ⏻ logout button and reconnect to Gmail
- Make sure your Google OAuth Client ID is correct

### "No emails found" Error
- Check if you have unread emails in Gmail
- Try the "🔧 Test Gmail Connection" button

### "API key not configured" Error
- Click "🔑 Setup API Key" and enter your Groq API key
- Make sure the key starts with `gsk_`

## Free Tier Limits

- **Groq**: 14,400 requests/day (free)
- **Gmail API**: 1 billion quota units/day (free)
- **Analysis**: ~5-10 emails per analysis run

## Support

For issues or questions, please check the console logs in Chrome Developer Tools for detailed error messages.
