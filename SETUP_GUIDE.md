# ScopeGuard Extension Setup Guide

## Why You're Getting "No emails found"

The "No emails found" error typically occurs due to one of these issues:

1. **Missing Google OAuth Configuration** - The extension needs proper Google API credentials
2. **Missing Groq API Key** - Required for AI analysis
3. **Authentication Issues** - Gmail connection not properly established
4. **Email Query Issues** - The search query might be too restrictive

## Step-by-Step Setup

### 1. Configure Google OAuth (Required)

The extension needs a valid Google OAuth client ID to access Gmail.

#### Option A: Use Your Own Google Cloud Project (Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Gmail API:
   - Go to "APIs & Services" > "Library"
   - Search for "Gmail API" and enable it
4. Create OAuth credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Chrome extension" as application type
   - Add your extension ID (get it from chrome://extensions/)
5. Copy the Client ID and update `manifest.json`:
   ```json
   "oauth2": {
     "client_id": "YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com",
     "scopes": [
       "https://www.googleapis.com/auth/gmail.readonly",
       "https://www.googleapis.com/auth/userinfo.email"
     ]
   }
   ```

#### Option B: Use Test Credentials (Quick Setup)

For testing purposes, you can use a shared test client ID. Update `manifest.json`:

```json
"oauth2": {
  "client_id": "463544145253-i3evjem0fuesv8k5u8cqmunhduj21nec.apps.googleusercontent.com",
  "scopes": [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}
```

### 2. Get Groq API Key (Required for AI Analysis)

1. Go to [Groq Console](https://console.groq.com/)
2. Create a free account
3. Navigate to "API Keys" section
4. Create a new API key (starts with `gsk_`)
5. Copy the API key
6. In the extension popup, click "Setup API Key" and paste it

### 3. Install and Test the Extension

1. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `scopeguard-extension` folder

2. Test the connection:
   - Click the extension icon
   - Click "Connect Gmail" to authenticate
   - Click "Test Gmail Connection" to verify everything works
   - Click "Setup API Key" to configure AI analysis

### 4. Troubleshooting

#### "No emails found" - Possible Causes:

1. **No unread emails**: The extension searches for unread emails by default
2. **Authentication failed**: Check if Gmail connection is working
3. **API key missing**: Ensure Groq API key is configured
4. **OAuth issues**: Verify the client ID in manifest.json

#### Debug Steps:

1. **Check Authentication**:
   - Click "Test Gmail Connection"
   - Look for "✅ Auth token found" in results

2. **Check API Key**:
   - Look for "✅ Groq API key found" in test results

3. **Check Email Queries**:
   - The test will try different Gmail search queries
   - If "All emails" works but "Unread emails" doesn't, you might have no unread emails

4. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Look for error messages in the Console tab

#### Common Error Messages:

- **"Not authenticated"**: Click "Connect Gmail" first
- **"Gmail API access denied"**: Check OAuth configuration
- **"Authentication expired"**: Reconnect to Gmail
- **"No API key configured"**: Set up Groq API key

### 5. Alternative Email Queries

If you're still not seeing emails, the extension searches for unread emails by default. You can modify the query in `popup.js`:

```javascript
// Current query (unread emails only)
chrome.runtime.sendMessage({ action: 'getEmails', query: 'is:unread', maxResults: 10 }

// Try these alternatives:
chrome.runtime.sendMessage({ action: 'getEmails', query: '', maxResults: 10 } // All emails
chrome.runtime.sendMessage({ action: 'getEmails', query: 'newer_than:1d', maxResults: 10 } // Recent emails
chrome.runtime.sendMessage({ action: 'getEmails', query: 'is:important', maxResults: 10 } // Important emails
```

## Next Steps

Once everything is configured:

1. The extension will show a 🛡️ badge next to emails in Gmail
2. Click "Analyze Latest Emails" to run AI analysis
3. Scope creep emails will be highlighted with ⚠️
4. You'll get suggested responses for scope creep situations

## Support

If you're still having issues:

1. Check the browser console for detailed error messages
2. Use the "Test Gmail Connection" feature for diagnostics
3. Verify you have emails in your Gmail inbox
4. Make sure both OAuth and API key are properly configured
