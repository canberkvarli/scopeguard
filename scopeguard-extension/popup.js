let isAuthenticated = false;

document.addEventListener('DOMContentLoaded', async () => {
  // Check if already authenticated
  const stored = await chrome.storage.local.get(['authToken', 'analyzedEmails']);
  
  if (stored.authToken) {
    isAuthenticated = true;
    showDashboard();
    
    if (stored.analyzedEmails) {
      displayEmails(stored.analyzedEmails);
    }
  }
  
  // Connect button
  document.getElementById('connect-btn').addEventListener('click', authenticate);
  
  // Analyze button
  document.getElementById('analyze-btn').addEventListener('click', analyzeEmails);
  
  // Logout button
  document.getElementById('logout-btn')?.addEventListener('click', logout);
  
  // Test button
  document.getElementById('test-btn')?.addEventListener('click', testGmailConnection);
  
  // Setup button
  document.getElementById('setup-btn')?.addEventListener('click', setupApiKey);
});

async function authenticate() {
  showLoading();
  
  chrome.runtime.sendMessage({ action: 'authenticate' }, (response) => {
    if (response.success) {
      isAuthenticated = true;
      showDashboard();
      analyzeEmails();
    } else {
      alert('Authentication failed. Please try again.');
      hideLoading();
    }
  });
}

async function analyzeEmails() {
  showLoading();
  
  try {
    // Get work-related emails only
    chrome.runtime.sendMessage({ action: 'getEmails', query: 'is:unread', maxResults: 10 }, async (response) => {
      console.log('Gmail response:', response);
      
      if (!response.success) {
        alert(`Failed to fetch emails: ${response.error || 'Unknown error'}`);
        hideLoading();
        return;
      }
      
      const emails = response.messages;
      console.log('Fetched emails:', emails);
      
      if (!emails || emails.length === 0) {
        alert('No emails found. Make sure you have emails in your Gmail inbox.');
        hideLoading();
        return;
      }
      
      const analyzedEmails = [];
      
      // Analyze each email with AI
      for (const email of emails) {
        console.log('Analyzing email:', email.subject);
        console.log('Email data:', email);
        
        try {
          const analysisResponse = await new Promise(resolve => {
            chrome.runtime.sendMessage({ action: 'analyzeEmail', email }, resolve);
          });
          
          console.log('Analysis response:', analysisResponse);
          
          if (analysisResponse.success) {
            console.log('✅ Analysis successful for:', email.subject);
            analyzedEmails.push({
              ...email,
              ...analysisResponse.analysis
            });
          } else {
            console.error('❌ Analysis failed for email:', email.subject, analysisResponse.error);
            // Add failed email with error info
            analyzedEmails.push({
              ...email,
              isScopeCreep: false,
              confidence: "error",
              reason: `Analysis failed: ${analysisResponse.error}`,
              suggestedResponse: "Unable to analyze this email"
            });
          }
        } catch (error) {
          console.error('❌ Error analyzing email:', error);
          // Add failed email with error info
          analyzedEmails.push({
            ...email,
            isScopeCreep: false,
            confidence: "error", 
            reason: `Error: ${error.message}`,
            suggestedResponse: "Unable to analyze this email"
          });
        }
      }
      
      console.log('Final analyzed emails:', analyzedEmails);
      
      // Save results
      await chrome.storage.local.set({ analyzedEmails });
      
      displayEmails(analyzedEmails);
      hideLoading();
      showDashboard();
    });
  } catch (error) {
    console.error('Error in analyzeEmails:', error);
    alert(`Error analyzing emails: ${error.message}`);
    hideLoading();
  }
}

function displayEmails(emails) {
  const emailList = document.getElementById('email-list');
  const totalAnalyzed = document.getElementById('total-analyzed');
  const scopeCreepCount = document.getElementById('scope-creep-count');
  
  totalAnalyzed.textContent = emails.length;
  scopeCreepCount.textContent = emails.filter(e => e.isScopeCreep).length;
  
  emailList.innerHTML = emails.map(email => `
    <div class="email-item ${email.isScopeCreep ? 'scope-creep' : ''}">
      <div class="email-subject">
        ${email.isScopeCreep ? '⚠️' : '✓'} ${email.subject}
      </div>
      <div class="email-from">${email.from}</div>
      ${email.isScopeCreep ? `<div style="margin-top: 8px; font-size: 12px; color: #fca5a5;">${email.reason}</div>` : ''}
    </div>
  `).join('');
}

function showDashboard() {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('status').textContent = '✓ Connected';
  document.getElementById('status').classList.add('connected');
  document.getElementById('logout-btn').style.display = 'block';
}

function showLoading() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('auth-section').style.display = 'none';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

async function testGmailConnection() {
  console.log('Testing Gmail connection...');
  
  // Test 1: Check if we have auth token
  const stored = await chrome.storage.local.get(['authToken']);
  console.log('Auth token exists:', !!stored.authToken);
  
  if (!stored.authToken) {
    alert('❌ No auth token found. Please connect to Gmail first.');
    return;
  }
  
  // Test 2: Try to fetch just 1 work-related email
  chrome.runtime.sendMessage({ action: 'getEmails', query: 'is:unread', maxResults: 1 }, (response) => {
    console.log('Gmail API test response:', response);
    
    if (response.success) {
      const emailCount = response.messages ? response.messages.length : 0;
      alert(`✅ Gmail connection working!\n\nFound ${emailCount} email(s)\n\nFirst email subject: ${response.messages?.[0]?.subject || 'N/A'}`);
    } else {
      alert(`❌ Gmail API failed:\n\n${response.error || 'Unknown error'}`);
    }
  });
}

async function setupApiKey() {
  const apiKey = prompt('Enter your Groq API Key:\n\n1. Go to https://console.groq.com/\n2. Create a free account\n3. Get your API key (starts with gsk_)\n4. Paste it here:');
  
  if (apiKey && apiKey.startsWith('gsk_')) {
    chrome.runtime.sendMessage({ action: 'setApiKey', apiKey }, (response) => {
      if (response.success) {
        alert('✅ API Key saved successfully!\n\nYou can now analyze emails with AI.');
      } else {
        alert('❌ Failed to save API key. Please try again.');
      }
    });
  } else if (apiKey) {
    alert('❌ Invalid API key format. Groq API keys start with "gsk_"');
  }
}

async function logout() {
  if (confirm('Are you sure you want to disconnect from Gmail? This will clear all stored data.')) {
    // Clear stored data
    await chrome.storage.local.clear();
    
    // Revoke the token
    chrome.runtime.sendMessage({ action: 'logout' }, () => {
      // Reset UI
      isAuthenticated = false;
      document.getElementById('auth-section').style.display = 'block';
      document.getElementById('dashboard').style.display = 'none';
      document.getElementById('status').textContent = 'Not connected';
      document.getElementById('status').classList.remove('connected');
      document.getElementById('logout-btn').style.display = 'none';
      
      // Clear email list
      document.getElementById('email-list').innerHTML = '';
      document.getElementById('total-analyzed').textContent = '0';
      document.getElementById('scope-creep-count').textContent = '0';
    });
  }
}