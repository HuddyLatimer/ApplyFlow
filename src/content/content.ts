// Content script for extracting job data from multiple job sites

interface JobData {
  title: string;
  company: string;
  url: string;
}

function extractLinkedInJobData(): JobData | null {
  try {
    const titleElement = document.querySelector('.job-details-jobs-unified-top-card__job-title') ||
                        document.querySelector('.jobs-unified-top-card__job-title') ||
                        document.querySelector('h1.t-24');

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
    const titleElement = document.querySelector('.jobsearch-JobInfoHeader-title') ||
                        document.querySelector('h1.jobsearch-JobInfoHeader-title-container') ||
                        document.querySelector('h1[class*="jobsearch-JobInfoHeader"]');

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

function extractWellfoundJobData(): JobData | null {
  try {
    // Wellfound (formerly AngelList Talent)
    const titleElement = document.querySelector('h1[class*="heading"]') ||
                        document.querySelector('h1.mb-2') ||
                        document.querySelector('[data-test="JobTitle"]') ||
                        document.querySelector('h1');

    const companyElement = document.querySelector('[data-test="StartupLink"]') ||
                          document.querySelector('a[href*="/company/"]') ||
                          document.querySelector('.company-name') ||
                          document.querySelector('h2 a');

    const title = titleElement?.textContent?.trim() || '';
    const company = companyElement?.textContent?.trim() || '';
    const url = window.location.href;

    if (title && company) {
      return { title, company, url };
    }

    return null;
  } catch (error) {
    console.error('Error extracting Wellfound job data:', error);
    return null;
  }
}

function extractBuiltInJobData(): JobData | null {
  try {
    // Built In
    const titleElement = document.querySelector('h1[data-id="job-title"]') ||
                        document.querySelector('.job-title') ||
                        document.querySelector('h1.font-barlow') ||
                        document.querySelector('h1');

    const companyElement = document.querySelector('[data-id="company-title"]') ||
                          document.querySelector('.company-title') ||
                          document.querySelector('a[href*="/company/"]') ||
                          document.querySelector('.job-company-name');

    const title = titleElement?.textContent?.trim() || '';
    const company = companyElement?.textContent?.trim() || '';
    const url = window.location.href;

    if (title && company) {
      return { title, company, url };
    }

    return null;
  } catch (error) {
    console.error('Error extracting Built In job data:', error);
    return null;
  }
}

function extractZipRecruiterJobData(): JobData | null {
  try {
    // ZipRecruiter
    const titleElement = document.querySelector('h1[class*="JobTitle"]') ||
                        document.querySelector('h1.job_title') ||
                        document.querySelector('[data-testid="jobTitle"]') ||
                        document.querySelector('h1');

    const companyElement = document.querySelector('a[class*="CompanyName"]') ||
                          document.querySelector('[data-testid="companyName"]') ||
                          document.querySelector('.job_company_name') ||
                          document.querySelector('a[href*="/company/"]');

    const title = titleElement?.textContent?.trim() || '';
    const company = companyElement?.textContent?.trim() || '';
    const url = window.location.href;

    if (title && company) {
      return { title, company, url };
    }

    return null;
  } catch (error) {
    console.error('Error extracting ZipRecruiter job data:', error);
    return null;
  }
}

function extractWorkopolisJobData(): JobData | null {
  try {
    // Workopolis
    const titleElement = document.querySelector('h1.job-title') ||
                        document.querySelector('[itemprop="title"]') ||
                        document.querySelector('.job-header h1') ||
                        document.querySelector('h1');

    const companyElement = document.querySelector('[itemprop="hiringOrganization"]') ||
                          document.querySelector('.job-company') ||
                          document.querySelector('.company-name') ||
                          document.querySelector('a[href*="/company/"]');

    const title = titleElement?.textContent?.trim() || '';
    const company = companyElement?.textContent?.trim() || '';
    const url = window.location.href;

    if (title && company) {
      return { title, company, url };
    }

    return null;
  } catch (error) {
    console.error('Error extracting Workopolis job data:', error);
    return null;
  }
}

function extractJobBankJobData(): JobData | null {
  try {
    // Canada Job Bank (jobbank.gc.ca)
    const titleElement = document.querySelector('h1[property="title"]') ||
                        document.querySelector('.job-posting-detail-title') ||
                        document.querySelector('span[property="title"]') ||
                        document.querySelector('h1');

    const companyElement = document.querySelector('span[property="name"]') ||
                          document.querySelector('.job-posting-detail-organization') ||
                          document.querySelector('[property="hiringOrganization"]') ||
                          document.querySelector('.employer-name');

    const title = titleElement?.textContent?.trim() || '';
    const company = companyElement?.textContent?.trim() || '';
    const url = window.location.href;

    if (title && company) {
      return { title, company, url };
    }

    return null;
  } catch (error) {
    console.error('Error extracting Job Bank job data:', error);
    return null;
  }
}

function extractDiceJobData(): JobData | null {
  try {
    // Dice
    const titleElement = document.querySelector('h1[data-cy="jobTitle"]') ||
                        document.querySelector('.jobTitle') ||
                        document.querySelector('h1.job-title') ||
                        document.querySelector('h1');

    const companyElement = document.querySelector('a[data-cy="companyNameLink"]') ||
                          document.querySelector('.employer') ||
                          document.querySelector('[data-cy="companyName"]') ||
                          document.querySelector('.company-name');

    const title = titleElement?.textContent?.trim() || '';
    const company = companyElement?.textContent?.trim() || '';
    const url = window.location.href;

    if (title && company) {
      return { title, company, url };
    }

    return null;
  } catch (error) {
    console.error('Error extracting Dice job data:', error);
    return null;
  }
}

function extractGlassdoorJobData(): JobData | null {
  try {
    // Glassdoor
    const titleElement = document.querySelector('[data-test="job-title"]') ||
                        document.querySelector('.job-title') ||
                        document.querySelector('h2[class*="JobDetails"]') ||
                        document.querySelector('div[class*="JobDetails_jobTitle"]') ||
                        document.querySelector('h1');

    const companyElement = document.querySelector('[data-test="employer-name"]') ||
                          document.querySelector('.employer-name') ||
                          document.querySelector('div[class*="JobDetails_employerName"]') ||
                          document.querySelector('[data-test="employerName"]');

    const title = titleElement?.textContent?.trim() || '';
    const company = companyElement?.textContent?.trim() || '';
    const url = window.location.href;

    if (title && company) {
      return { title, company, url };
    }

    return null;
  } catch (error) {
    console.error('Error extracting Glassdoor job data:', error);
    return null;
  }
}

function extractJobData(): JobData | null {
  const url = window.location.href;
  const hostname = window.location.hostname;

  // Route to appropriate extraction function based on URL
  if (url.includes('linkedin.com/jobs')) {
    return extractLinkedInJobData();
  } else if (url.includes('indeed.com')) {
    return extractIndeedJobData();
  } else if (hostname.includes('wellfound.com') || hostname.includes('angel.co')) {
    return extractWellfoundJobData();
  } else if (hostname.includes('builtin.com')) {
    return extractBuiltInJobData();
  } else if (hostname.includes('ziprecruiter.com')) {
    return extractZipRecruiterJobData();
  } else if (hostname.includes('workopolis.com')) {
    return extractWorkopolisJobData();
  } else if (hostname.includes('jobbank.gc.ca')) {
    return extractJobBankJobData();
  } else if (hostname.includes('dice.com')) {
    return extractDiceJobData();
  } else if (hostname.includes('glassdoor.com') || hostname.includes('glassdoor.ca')) {
    return extractGlassdoorJobData();
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
