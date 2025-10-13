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
    // Get emails
    chrome.runtime.sendMessage({ action: 'getEmails', maxResults: 5 }, async (response) => {
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
        
        try {
          const analysisResponse = await new Promise(resolve => {
            chrome.runtime.sendMessage({ action: 'analyzeEmail', email }, resolve);
          });
          
          console.log('Analysis response:', analysisResponse);
          
          if (analysisResponse.success) {
            analyzedEmails.push({
              ...email,
              ...analysisResponse.analysis
            });
          } else {
            console.error('Analysis failed for email:', email.subject, analysisResponse.error);
          }
        } catch (error) {
          console.error('Error analyzing email:', error);
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