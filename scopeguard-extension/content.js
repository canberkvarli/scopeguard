// Content script that runs on Gmail pages
console.log('ScopeGuard: Monitoring Gmail...');

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

// Monitor for new emails
const observer = new MutationObserver(() => {
  addScopeGuardBadges();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial badge addition
setTimeout(addScopeGuardBadges, 1000);