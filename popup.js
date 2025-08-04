// Popup script for Gmail AI Assistant
document.addEventListener('DOMContentLoaded', function() {
    const statusText = document.getElementById('status-text');
    
    // Check if we're on a Gmail page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        const isGmail = currentTab.url && currentTab.url.includes('mail.google.com');
        
        if (isGmail) {
            statusText.textContent = 'Extension is active on Gmail. Ready to extract email text.';
            statusText.style.color = '#34a853';
        } else {
            statusText.textContent = 'Please navigate to Gmail to use this extension.';
            statusText.style.color = '#ea4335';
        }
    });
    
    // Add click handler for instructions
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            chrome.tabs.create({url: e.target.href});
        }
    });
}); 