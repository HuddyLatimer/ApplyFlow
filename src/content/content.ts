// Content script for extracting job data from LinkedIn and Indeed

interface JobData {
  title: string;
  company: string;
  url: string;
}

function extractLinkedInJobData(): JobData | null {
  try {
    // LinkedIn job title
    const titleElement = document.querySelector('.job-details-jobs-unified-top-card__job-title') ||
                        document.querySelector('.jobs-unified-top-card__job-title') ||
                        document.querySelector('h1.t-24');

    // LinkedIn company name
    const companyElement = document.querySelector('.job-details-jobs-unified-top-card__company-name') ||
                          document.querySelector('.jobs-unified-top-card__company-name') ||
                          document.querySelector('.jobs-unified-top-card__subtitle-primary-grouping a') ||
                          document.querySelector('a[data-tracking-control-name="public_jobs_topcard-org-name"]');

    const title = titleElement?.textContent?.trim() || '';
    const company = companyElement?.textContent?.trim() || '';
    const url = window.location.href;

    if (title && company) {
      return { title, company, url };
    }

    return null;
  } catch (error) {
    console.error('Error extracting LinkedIn job data:', error);
    return null;
  }
}

function extractIndeedJobData(): JobData | null {
  try {
    // Indeed job title
    const titleElement = document.querySelector('.jobsearch-JobInfoHeader-title') ||
                        document.querySelector('h1.jobsearch-JobInfoHeader-title-container') ||
                        document.querySelector('h1[class*="jobsearch-JobInfoHeader"]');

    // Indeed company name
    const companyElement = document.querySelector('[data-company-name="true"]') ||
                          document.querySelector('.jobsearch-InlineCompanyRating-companyHeader') ||
                          document.querySelector('div[data-testid="inlineHeader-companyName"]') ||
                          document.querySelector('.jobsearch-CompanyInfoContainer a');

    const title = titleElement?.textContent?.trim() || '';
    const company = companyElement?.textContent?.trim() || '';
    const url = window.location.href;

    if (title && company) {
      return { title, company, url };
    }

    return null;
  } catch (error) {
    console.error('Error extracting Indeed job data:', error);
    return null;
  }
}

function extractJobData(): JobData | null {
  const url = window.location.href;

  if (url.includes('linkedin.com/jobs')) {
    return extractLinkedInJobData();
  } else if (url.includes('indeed.com')) {
    return extractIndeedJobData();
  }

  return null;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'extractJobData') {
    const jobData = extractJobData();

    if (jobData) {
      sendResponse({ success: true, data: jobData });
    } else {
      sendResponse({ success: false, error: 'Could not extract job data' });
    }
  }

  return true; // Required to use sendResponse asynchronously
});

// Also inject a visual indicator that ApplyFlow is active
function injectIndicator() {
  const existingIndicator = document.getElementById('applyflow-indicator');
  if (existingIndicator) return;

  const indicator = document.createElement('div');
  indicator.id = 'applyflow-indicator';
  indicator.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    display: flex;
    align-items: center;
    gap: 6px;
  `;
  indicator.innerHTML = '💼 ApplyFlow Active';

  document.body.appendChild(indicator);

  // Remove after 3 seconds
  setTimeout(() => {
    indicator.style.transition = 'opacity 0.3s';
    indicator.style.opacity = '0';
    setTimeout(() => indicator.remove(), 300);
  }, 3000);
}

// Inject indicator when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectIndicator);
} else {
  injectIndicator();
}
