// Content script that runs on Gmail pages
console.log('ScopeGuard: Monitoring Gmail...');

let lastEmailCount = 0;
let isAnalyzing = false;

// Add ScopeGuard indicator to emails
function addScopeGuardBadges() {
  const emailRows = document.querySelectorAll('tr.zA');
  
  emailRows.forEach(row => {
    if (row.querySelector('.scopeguard-badge')) return;
    
    const badge = document.createElement('span');
    badge.className = 'scopeguard-badge';
    badge.textContent = '🛡️';
    badge.title = 'Protected by ScopeGuard';
    badge.style.cssText = 'margin-left: 8px; opacity: 0.6;';
    
    const subject = row.querySelector('.bog');
    if (subject) {
      subject.appendChild(badge);
    }
  });
}

// Check for new emails and trigger analysis
function checkForNewEmails() {
  if (isAnalyzing) return;
  
  const emailRows = document.querySelectorAll('tr.zA');
  const currentEmailCount = emailRows.length;
  
  if (currentEmailCount > lastEmailCount) {
    console.log('📧 New emails detected! Triggering analysis...');
    lastEmailCount = currentEmailCount;
    
    // Notify background script to scan for new emails
    chrome.runtime.sendMessage({ action: 'scanNewEmails' }, (response) => {
      if (response && response.success) {
        console.log('✅ New email analysis completed');
      }
    });
  }
}

// Monitor for new emails
const observer = new MutationObserver(() => {
  addScopeGuardBadges();
  checkForNewEmails();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial setup
setTimeout(() => {
  addScopeGuardBadges();
  const emailRows = document.querySelectorAll('tr.zA');
  lastEmailCount = emailRows.length;
}, 1000);