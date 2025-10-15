// Background script for handling Gmail API and AI analysis
let authToken = null;
let groqApiKey = null;

// Force auto-configure API key immediately
const defaultApiKey = 'YOUR_GROQ_API_KEY_HERE'; // Replace with your actual API key
groqApiKey = defaultApiKey;
chrome.storage.local.set({ groqApiKey: defaultApiKey });
console.log('🔑 Force-configured API key on startup');

// Load configuration on startup
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['groqApiKey'], (result) => {
    if (result.groqApiKey) {
      groqApiKey = result.groqApiKey;
      console.log('🔑 Loaded API key from storage');
    } else {
      // Auto-set the API key from your .env file
      groqApiKey = defaultApiKey;
      chrome.storage.local.set({ groqApiKey: defaultApiKey });
      console.log('🔑 Auto-configured API key');
    }
  });
});

// Initialize on extension install/startup
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['groqApiKey'], (result) => {
    if (result.groqApiKey) {
      groqApiKey = result.groqApiKey;
      console.log('🔑 Loaded API key from storage');
    } else {
      // Auto-set the API key from your .env file
      groqApiKey = defaultApiKey;
      chrome.storage.local.set({ groqApiKey: defaultApiKey });
      console.log('🔑 Auto-configured API key');
    }
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('📨 Background received message:', request);
  
  if (request.action === 'analyzeEmail') {
    analyzeEmailWithAI(request.emailData)
      .then(result => {
        console.log('✅ Analysis complete:', result);
        sendResponse({ success: true, result });
      })
      .catch(error => {
        console.error('❌ Analysis failed:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep message channel open for async response
  }

  if (request.action === 'getAuthToken') {
    sendResponse({ token: authToken });
  }

  if (request.action === 'setAuthToken') {
    authToken = request.token;
    console.log('🔐 Auth token set');
    sendResponse({ success: true });
  }

  if (request.action === 'getApiKey') {
    sendResponse({ apiKey: groqApiKey });
  }

  if (request.action === 'setApiKey') {
    groqApiKey = request.apiKey;
    chrome.storage.local.set({ groqApiKey: groqApiKey });
    console.log('🔑 API key updated');
    sendResponse({ success: true });
  }
});

// Function to analyze email with AI
async function analyzeEmailWithAI(emailData) {
  console.log('🤖 Starting AI analysis...');
  
  if (!groqApiKey || groqApiKey === 'YOUR_GROQ_API_KEY_HERE') {
    throw new Error('Groq API key not configured. Please set your API key in the extension popup.');
  }

  try {
    // Prepare the prompt for AI analysis
    const prompt = `Analyze this email for potential security threats, phishing attempts, or suspicious content. Consider the following aspects:

1. Sender verification (is the sender legitimate?)
2. Content analysis (any suspicious links, requests, or language?)
3. Urgency indicators (excessive urgency, threats, or pressure?)
4. Request analysis (requests for sensitive information, money, or actions?)
5. Overall risk assessment

Email Details:
- From: ${emailData.from}
- Subject: ${emailData.subject}
- Body: ${emailData.body}
- Links: ${emailData.links ? emailData.links.join(', ') : 'None detected'}

Please provide a comprehensive analysis with:
1. Risk Level (Low/Medium/High)
2. Key concerns
3. Specific recommendations
4. Confidence score (1-10)

Format your response as JSON with the following structure:
{
  "riskLevel": "Low|Medium|High",
  "confidence": 1-10,
  "concerns": ["list", "of", "concerns"],
  "recommendations": ["list", "of", "recommendations"],
  "summary": "Brief summary of the analysis"
}`;

    console.log('📤 Sending request to Groq API...');
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a cybersecurity expert specializing in email security analysis. Provide detailed, accurate analysis of potential email threats.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ API Error:', response.status, errorData);
      throw new Error(`API request failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('📥 Received response from Groq API');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from AI service');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('🤖 AI Response:', aiResponse);

    // Try to parse the JSON response
    let analysisResult;
    try {
      analysisResult = JSON.parse(aiResponse);
    } catch (parseError) {
      console.warn('⚠️ Could not parse JSON response, using raw text');
      analysisResult = {
        riskLevel: 'Unknown',
        confidence: 5,
        concerns: ['Unable to parse AI response'],
        recommendations: ['Review email manually'],
        summary: aiResponse
      };
    }

    // Validate the response structure
    if (!analysisResult.riskLevel || !analysisResult.confidence) {
      analysisResult = {
        riskLevel: analysisResult.riskLevel || 'Unknown',
        confidence: analysisResult.confidence || 5,
        concerns: analysisResult.concerns || ['Analysis incomplete'],
        recommendations: analysisResult.recommendations || ['Review email manually'],
        summary: analysisResult.summary || aiResponse
      };
    }

    console.log('✅ Analysis completed successfully');
    return analysisResult;

  } catch (error) {
    console.error('❌ Analysis failed:', error);
    throw new Error(`AI analysis failed: ${error.message}`);
  }
}

// Function to get Gmail auth token
async function getGmailAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        authToken = token;
        resolve(token);
      }
    });
  });
}

// Function to fetch email content
async function fetchEmailContent(messageId) {
  if (!authToken) {
    throw new Error('No auth token available');
  }

  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
    {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    }
  );

    if (!response.ok) {
    throw new Error(`Failed to fetch email: ${response.status}`);
  }

  return response.json();
}

// Function to extract email data
function extractEmailData(email) {
  const headers = email.payload.headers;
  const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
  const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
  
  let body = '';
  let links = [];

  // Extract body content
  if (email.payload.body && email.payload.body.data) {
    body = atob(email.payload.body.data);
  } else if (email.payload.parts) {
    for (const part of email.payload.parts) {
      if (part.mimeType === 'text/plain' && part.body && part.body.data) {
        body = atob(part.body.data);
        break;
      }
    }
  }

  // Extract links from body
  const linkRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/g;
  const matches = body.match(linkRegex);
  if (matches) {
    links = matches;
  }

  return {
    from,
    subject,
    body: body.substring(0, 2000), // Limit body length
    links
  };
}

console.log('🚀 ScopeGuard background script loaded');
