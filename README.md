# ApplyFlow - Job Application Tracker

A powerful Chrome extension that helps job seekers organize and track their job applications from LinkedIn and Indeed in one convenient place.

![ApplyFlow](https://img.shields.io/badge/version-1.0.0-blue)
![Manifest](https://img.shields.io/badge/manifest-v3-green)
![React](https://img.shields.io/badge/react-18.2.0-61dafb)

## Features

### Core Functionality
- **One-Click Save**: Save job listings directly from LinkedIn and Indeed job pages
- **Application Tracking**: Track the status of each application through 5 stages:
  - 💼 Saved - Job bookmarked for later
  - ✅ Applied - Application submitted
  - 🗓️ Interview - Interview scheduled
  - ❌ Rejected - Application rejected
  - 🎉 Offer - Job offer received

### Stats Dashboard
Get instant insights into your job search:
- **Total Jobs Saved**: Track all saved opportunities
- **Applications Submitted**: Count of jobs you've applied to
- **Response Rate**: Percentage of applications that led to interviews or offers
- **Interview Count**: Number of interview opportunities
- **Offer Count**: Number of job offers received
- **Rejection Count**: Track rejections to stay motivated

### Technical Highlights
- Built with **React 18** and **TypeScript**
- Styled with **Tailwind CSS** for a modern, clean interface
- Uses **Chrome Storage API** for local data persistence
- **Manifest V3** compliant
- No backend required - all data stored locally on your device

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Chrome browser

### Setup Instructions

1. **Clone or download this repository**
   ```bash
   cd "C:\Users\HL\Documents\ApplyFlow – Job Application Tracker"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate Extension Icons**
   - Open `generate-icons.html` in your browser
   - Click the download buttons to save `icon48.png` and `icon128.png`
   - Move both PNG files into the `public/` folder

4. **Build the extension**
   ```bash
   npm run build
   ```

   This will create a `dist/` folder with the compiled extension.

5. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `dist/` folder from your project directory

6. **Start using ApplyFlow!**
   - Navigate to a job posting on LinkedIn or Indeed
   - Click the ApplyFlow icon in your Chrome toolbar
   - Click "Save Current Job" to add the job to your tracker

## How to Use

### Saving Jobs

1. Navigate to a job posting on LinkedIn or Indeed
2. Click the ApplyFlow extension icon in your toolbar
3. Click the "Save Current Job" button
4. The job will be automatically saved with status "Saved"

### Updating Job Status

1. Open the ApplyFlow popup by clicking the extension icon
2. Find the job you want to update
3. Click one of the emoji status buttons to update:
   - 💼 (Saved)
   - ✅ (Applied)
   - 🗓️ (Interview)
   - ❌ (Rejected)
   - 🎉 (Offer)

### Viewing Your Applications

- All saved jobs appear in the popup in chronological order (newest first)
- Each job card shows:
  - Job title and company
  - Current status with color-coded badge
  - Date saved
  - Link to the original job posting

### Deleting Jobs

- Click the 🗑️ (trash) icon on any job card to remove it from your tracker

## Project Structure

```
applyflow-extension/
├── public/
│   ├── icon48.png              # Extension icon (48x48)
│   ├── icon128.png             # Extension icon (128x128)
│   └── manifest.json           # Chrome extension manifest
├── src/
│   ├── popup/
│   │   ├── index.html          # Popup HTML entry point
│   │   ├── main.tsx            # React app entry point
│   │   └── Popup.tsx           # Main popup component
│   ├── content/
│   │   └── content.ts          # Content script for job extraction
│   ├── background/
│   │   └── background.ts       # Background service worker
│   ├── components/
│   │   └── JobCard.tsx         # Job card component
│   ├── utils/
│   │   └── storage.ts          # Chrome Storage API utilities
│   └── index.css               # Global styles with Tailwind
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.ts              # Vite build configuration
└── README.md                   # This file
```

## Development

### Running in Development Mode

```bash
npm run dev
```

This starts the Vite development server. However, for Chrome extension development, you'll typically want to build and reload:

```bash
npm run build
```

Then reload the extension in `chrome://extensions/`.

### Tech Stack

- **React 18.2**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **Chrome Extension APIs**: Storage, Tabs, Runtime, Context Menus

## Supported Job Sites

Currently supports:
- **LinkedIn Jobs** (`linkedin.com/jobs/*`)
- **Indeed** (`indeed.com/viewjob*`, `indeed.com/rc/clk*`)

## Features Breakdown

### Storage Management (`src/utils/storage.ts`)
- `getAllJobs()`: Retrieve all saved jobs
- `saveJob()`: Save a new job (prevents duplicates by URL)
- `updateJob()`: Update job status or details
- `deleteJob()`: Remove a job from storage
- `getStats()`: Calculate statistics for the dashboard

### Content Script (`src/content/content.ts`)
- Extracts job data from LinkedIn and Indeed pages
- Shows a visual indicator when active on supported sites
- Handles different page layouts and selectors

### Background Worker (`src/background/background.ts`)
- Initializes storage on installation
- Provides right-click context menu for quick saving
- Shows badge notification on successful save

## Troubleshooting

### Job data not extracting properly
- Make sure you're on a specific job posting page (not search results)
- LinkedIn and Indeed frequently update their HTML structure - selectors may need updating
- Check the browser console for error messages

### Extension not loading
- Ensure you've run `npm run build` successfully
- Check that all icon files are in the `public/` folder
- Verify Developer Mode is enabled in `chrome://extensions/`

### Data not persisting
- Chrome Storage API has a quota limit (usually 5MB for local storage)
- Check if you have the necessary permissions in `manifest.json`

## Future Enhancements (Bonus Ideas)

- Search and filter jobs by status, company, or title
- Export job list to CSV for external tracking
- Browser notifications (e.g., "Haven't followed up in 7 days")
- Tags and custom categories
- Application deadline reminders
- Notes and interview prep tracking
- Integration with Google Calendar for interview scheduling
- Dark mode support

## Privacy

ApplyFlow stores all data locally using Chrome's Storage API. No data is sent to external servers. Your job application data remains private and secure on your device.

## Contributing

This is an MVP (Minimum Viable Product). Contributions and suggestions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

MIT License - feel free to use and modify for your own projects.

## Credits

Built with love for job seekers everywhere. Good luck with your applications!

---

**Version**: 1.0.0
**Last Updated**: 2025-10-27
**Manifest Version**: 3
