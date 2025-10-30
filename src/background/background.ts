// Background service worker for ApplyFlow

// Installation handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('ApplyFlow installed successfully!');

    // Initialize storage with empty jobs array
    chrome.storage.local.set({ applyflow_jobs: [] });
  } else if (details.reason === 'update') {
    console.log('ApplyFlow updated to version', chrome.runtime.getManifest().version);
  }
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'saveJob') {
    // Handle job saving if needed
    console.log('Saving job:', request.data);
    sendResponse({ success: true });
  }

  return true;
});

// Optional: Add context menu for quick save
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'saveJobToApplyFlow',
    title: 'Save to ApplyFlow',
    contexts: ['page'],
    documentUrlPatterns: [
      'https://www.linkedin.com/jobs/*',
      'https://www.indeed.com/*',
      'https://www.indeed.ca/*',
      'https://wellfound.com/*',
      'https://angel.co/*',
      'https://*.builtin.com/*',
      'https://www.ziprecruiter.com/*',
      'https://www.workopolis.com/*',
      'https://www.jobbank.gc.ca/*',
      'https://www.dice.com/*',
      'https://www.glassdoor.com/*',
      'https://www.glassdoor.ca/*'
    ]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'saveJobToApplyFlow' && tab?.id) {
    // Send message to content script to extract and save job data
    chrome.tabs.sendMessage(tab.id, { action: 'extractJobData' }, (response) => {
      if (response && response.success) {
        // Show a notification or badge
        chrome.action.setBadgeText({ text: '✓', tabId: tab.id });
        chrome.action.setBadgeBackgroundColor({ color: '#22c55e', tabId: tab.id });

        setTimeout(() => {
          chrome.action.setBadgeText({ text: '', tabId: tab.id });
        }, 2000);
      }
    });
  }
});

// Keep service worker alive (optional, for Manifest V3)
let keepAliveInterval: number | null = null;

function keepAlive() {
  keepAliveInterval = setInterval(() => {
    chrome.runtime.getPlatformInfo(() => {
      // This just keeps the service worker active
    });
  }, 20000) as unknown as number; // Every 20 seconds
}

chrome.runtime.onStartup.addListener(() => {
  keepAlive();
});

// Clean up on suspend
chrome.runtime.onSuspend.addListener(() => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
  }
});
