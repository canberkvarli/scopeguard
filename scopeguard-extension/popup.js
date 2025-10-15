let isAuthenticated = false;
let isMonitoring = true;

document.addEventListener('DOMContentLoaded', async () => {
  // Show auth section by default
  showAuthSection();
  
  // Check if already authenticated
  const stored = await chrome.storage.local.get(['authToken', 'scopeCreepAlerts', 'groqApiKey', 'isMonitoring']);
  
  if (stored.authToken) {
    isAuthenticated = true;
    isMonitoring = stored.isMonitoring !== false; // Default to true
    showDashboard();
    
    // Start automatic monitoring if enabled
    if (isMonitoring) {
      startAutomaticMonitoring();
    }
  }
  
  // Connect button
  const connectBtn = document.getElementById('connect-btn');
  if (connectBtn) {
    connectBtn.addEventListener('click', () => {
      console.log('🔘 Connect button clicked!');
      authenticate();
    });
  }
  
  // Main toggle button
  const mainToggle = document.getElementById('main-toggle');
  if (mainToggle) {
    mainToggle.addEventListener('click', toggleMonitoring);
  }
  
  // Logout button
  document.getElementById('logout-btn')?.addEventListener('click', logout);
  
  // Debug button
  document.getElementById('debug-btn')?.addEventListener('click', debugScan);
});

async function authenticate() {
  console.log('🔐 Starting authentication...');
  showLoading('Connecting to Gmail...');
  
  try {
    chrome.runtime.sendMessage({ action: 'authenticate' }, (response) => {
      console.log('🔐 Authentication response:', response);
      
      if (chrome.runtime.lastError) {
        console.error('🔐 Chrome runtime error:', chrome.runtime.lastError);
        alert(`❌ Authentication failed:\n\n${chrome.runtime.lastError.message}\n\nThis might be due to:\n• Popup blockers\n• OAuth configuration issues\n• Extension permissions`);
        hideLoading();
        showAuthSection();
        return;
      }
      
      if (response && response.success) {
        console.log('✅ Authentication successful!');
        isAuthenticated = true;
        isMonitoring = true;
        showDashboard();
        startAutomaticMonitoring();
      } else {
        console.error('❌ Authentication failed:', response);
        const errorMsg = response?.error?.message || response?.error || 'Unknown error';
        alert(`❌ Authentication failed:\n\n${errorMsg}\n\nPlease check:\n• OAuth client ID in manifest.json\n• Extension permissions\n• Try refreshing the extension`);
        hideLoading();
        showAuthSection();
      }
    });
  } catch (error) {
    console.error('🔐 Authentication error:', error);
    alert(`❌ Authentication error:\n\n${error.message}`);
    hideLoading();
    showAuthSection();
  }
}

function showAuthSection() {
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  document.getElementById('logout-btn').style.display = 'none';
}

function toggleMonitoring() {
  isMonitoring = !isMonitoring;
  updateToggleDisplay();
  
  // Save monitoring state
  chrome.storage.local.set({ isMonitoring });
  
  if (isMonitoring) {
    console.log('🟢 Monitoring enabled - starting automatic scan');
    updateStatusText('Starting monitoring...');
    startAutomaticMonitoring();
  } else {
    console.log('🔴 Monitoring disabled');
    updateStatusText('Monitoring disabled');
    // Clear any existing alerts when disabled
    chrome.storage.local.set({ scopeCreepAlerts: [] });
    updateExtensionBadge(0);
  }
}

function updateToggleDisplay() {
  const toggle = document.getElementById('main-toggle');
  const toggleText = document.getElementById('toggle-text');
  
  if (isMonitoring) {
    toggle.className = 'main-toggle active';
    toggleText.textContent = 'ON';
  } else {
    toggle.className = 'main-toggle inactive';
    toggleText.textContent = 'OFF';
  }
}

function updateStatusText(text) {
  const statusText = document.getElementById('status-text');
  statusText.textContent = text;
}

function startAutomaticMonitoring() {
  if (!isMonitoring) return;
  
  console.log('🔄 Starting automatic monitoring...');
  updateStatusText('Scanning emails...');
  
  // Scan emails immediately
  scanEmails();
  
  // Set up periodic scanning every 30 seconds for real-time detection
  setInterval(() => {
    if (isMonitoring) {
      console.log('🔄 Periodic scan triggered');
      scanEmails();
    }
  }, 30 * 1000); // 30 seconds
}

async function scanEmails() {
  if (!isMonitoring) return;
  
  try {
    updateStatusText('Scanning emails...');
    
    // First check if we have an API key
    chrome.runtime.sendMessage({ action: 'getGroqApiKey' }, (apiResponse) => {
      console.log('API key check response:', apiResponse);
      
      if (!apiResponse || !apiResponse.apiKey) {
        console.log('❌ No API key configured - skipping scan');
        updateStatusText('API key needed');
        return;
      }
      
      // Get very recent emails for AI analysis (last 2 hours)
      chrome.runtime.sendMessage({ action: 'getEmails', query: 'in:inbox newer_than:2h', maxResults: 5 }, async (response) => {
        console.log('Gmail response:', response);
        
        if (!response.success) {
          console.error('❌ Failed to fetch emails:', response.error);
          updateStatusText('Email scan failed');
          return;
        }
        
        const emails = response.messages;
        console.log('Fetched emails:', emails);
        
        if (!emails || emails.length === 0) {
          updateStatusText('No new emails');
          return;
        }
        
        updateStatusText(`Analyzing ${emails.length} emails...`);
        const scopeCreepAlerts = [];
        
        // Analyze each email with AI for work-related content and scope creep
        for (const email of emails) {
          console.log('Analyzing email:', email.subject);
          
          try {
            const analysisResponse = await new Promise(resolve => {
              chrome.runtime.sendMessage({ 
                action: 'analyzeWorkEmail', 
                email, 
                enabledPlatforms: { fiverr: true, upwork: true, contra: true, freelancer: true } // Always monitor all platforms
              }, resolve);
            });
            
            console.log('Analysis response:', analysisResponse);
            
            if (analysisResponse.success && analysisResponse.analysis.isWorkEmail && analysisResponse.analysis.isScopeCreep) {
              console.log('⚠️ Scope creep detected in:', email.subject);
              scopeCreepAlerts.push({
                ...email,
                ...analysisResponse.analysis
              });
            }
          } catch (error) {
            console.error('❌ Error analyzing email:', error);
          }
        }
        
        console.log('Scope creep alerts:', scopeCreepAlerts);
        
        // Save results
        await chrome.storage.local.set({ scopeCreepAlerts });
        
        // Update extension badge
        updateExtensionBadge(scopeCreepAlerts.length);
        
        // Update status
        if (scopeCreepAlerts.length > 0) {
          updateStatusText(`${scopeCreepAlerts.length} scope creep alerts`);
        } else {
          updateStatusText('No scope creep detected');
        }
      });
    });
  } catch (error) {
    console.error('Error in scanEmails:', error);
    updateStatusText('Scan error');
  }
}

function showDashboard() {
  console.log('📊 Showing dashboard...');
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('dashboard').style.display = 'flex';
  document.getElementById('loading').style.display = 'none';
  document.getElementById('logout-btn').style.display = 'block';
  
  // Update toggle display
  updateToggleDisplay();
}

function showLoading(message = 'Connecting...') {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('auth-section').style.display = 'none';
  
  // Update loading message
  const loadingDiv = document.getElementById('loading').querySelector('div:last-child');
  if (loadingDiv) {
    loadingDiv.textContent = message;
  }
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
      isMonitoring = false;
      showAuthSection();
      
      // Clear badge
      chrome.action.setBadgeText({ text: '' });
    });
  }
}

function updateExtensionBadge(count) {
  if (count > 0) {
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#ef4444' }); // Red background
  } else {
    chrome.action.setBadgeText({ text: '' }); // Clear badge
  }
}

async function debugScan() {
  updateStatusText('Debug scan running...');
  
  try {
    // Get recent emails with more details
    chrome.runtime.sendMessage({ action: 'getEmails', query: 'in:inbox newer_than:1d', maxResults: 10 }, async (response) => {
      if (!response.success) {
        alert(`❌ Failed to fetch emails: ${response.error}`);
        return;
      }
      
      const emails = response.messages;
      if (!emails || emails.length === 0) {
        alert('📧 No emails found in the last day');
        return;
      }
      
      let debugInfo = `🔧 Debug Scan Results:\n\nFound ${emails.length} emails:\n\n`;
      
      for (let i = 0; i < Math.min(emails.length, 5); i++) {
        const email = emails[i];
        debugInfo += `${i + 1}. From: ${email.from}\n`;
        debugInfo += `   Subject: ${email.subject}\n`;
        debugInfo += `   Body: ${email.body.substring(0, 100)}...\n\n`;
        
        // Analyze this email
        try {
          const analysisResponse = await new Promise(resolve => {
            chrome.runtime.sendMessage({ 
              action: 'analyzeWorkEmail', 
              email, 
              enabledPlatforms: { fiverr: true, upwork: true, contra: true, freelancer: true }
            }, resolve);
          });
          
          if (analysisResponse.success) {
            const analysis = analysisResponse.analysis;
            debugInfo += `   AI Analysis:\n`;
            debugInfo += `   - Work Email: ${analysis.isWorkEmail}\n`;
            debugInfo += `   - Scope Creep: ${analysis.isScopeCreep}\n`;
            debugInfo += `   - Confidence: ${analysis.confidence}\n`;
            debugInfo += `   - Reason: ${analysis.reason}\n\n`;
          } else {
            debugInfo += `   AI Analysis: FAILED - ${analysisResponse.error}\n\n`;
          }
        } catch (error) {
          debugInfo += `   AI Analysis: ERROR - ${error.message}\n\n`;
        }
      }
      
      alert(debugInfo);
      updateStatusText('Debug scan completed');
    });
  } catch (error) {
    console.error('Debug scan error:', error);
    alert(`❌ Debug scan failed: ${error.message}`);
    updateStatusText('Debug scan failed');
  }
}