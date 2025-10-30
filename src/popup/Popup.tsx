import React, { useState, useEffect } from 'react';
import { Job, JobStatus, storage } from '../utils/storage';
import { JobCard } from '../components/JobCard';

interface Stats {
  total: number;
  applied: number;
  interviews: number;
  offers: number;
  rejected: number;
  responseRate: string;
}

export const Popup: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    applied: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
    responseRate: '0%',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [jobsData, statsData] = await Promise.all([
        storage.getAllJobs(),
        storage.getStats(),
      ]);
      setJobs(jobsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
      showNotification('Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAddCurrentJob = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab.id || !tab.url) {
        showNotification('No active tab found');
        return;
      }

      // Check if we're on a supported site
      const supportedSites = [
        'linkedin.com/jobs',
        'indeed.com',
        'indeed.ca',
        'wellfound.com',
        'angel.co',
        'builtin.com',
        'ziprecruiter.com',
        'workopolis.com',
        'jobbank.gc.ca',
        'dice.com',
        'glassdoor.com',
        'glassdoor.ca'
      ];

      const isSupported = supportedSites.some(site => tab.url?.includes(site));

      if (!isSupported) {
        showNotification('Please navigate to a job posting on a supported job site');
        return;
      }

      // Send message to content script to extract job data
      chrome.tabs.sendMessage(tab.id, { action: 'extractJobData' }, async (response) => {
        if (chrome.runtime.lastError) {
          showNotification('Unable to extract job data from this page');
          return;
        }

        if (response && response.success) {
          await storage.saveJob({
            title: response.data.title,
            company: response.data.company,
            url: response.data.url,
            status: 'saved',
          });
          await loadData();
          showNotification('Job saved successfully!');
        } else {
          showNotification('Unable to extract job data from this page');
        }
      });
    } catch (error) {
      console.error('Error adding job:', error);
      showNotification('Error adding job');
    }
  };

  const handleUpdateStatus = async (id: string, status: JobStatus) => {
    try {
      await storage.updateJob(id, { status });
      await loadData();
      showNotification('Status updated!');
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('Error updating status');
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await storage.deleteJob(id);
      await loadData();
      showNotification('Job deleted');
    } catch (error) {
      console.error('Error deleting job:', error);
      showNotification('Error deleting job');
    }
  };

  if (isLoading) {
    return (
      <div className="w-96 h-96 flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-96 max-h-[600px] bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-1">ApplyFlow</h1>
        <p className="text-xs text-primary-100">Job Application Tracker</p>
      </div>

      {/* Notification */}
      {notification && (
        <div className="bg-primary-500 text-white text-xs py-2 px-4 text-center">
          {notification}
        </div>
      )}

      {/* Stats Dashboard */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-600">Total Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.applied}</div>
            <div className="text-xs text-gray-600">Applied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.responseRate}</div>
            <div className="text-xs text-gray-600">Response Rate</div>
          </div>
        </div>

        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-purple-600 font-semibold">{stats.interviews}</span>
            <span className="text-gray-600">Interviews</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-600 font-semibold">{stats.offers}</span>
            <span className="text-gray-600">Offers</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600 font-semibold">{stats.rejected}</span>
            <span className="text-gray-600">Rejected</span>
          </div>
        </div>
      </div>

      {/* Add Job Button */}
      <div className="p-4 bg-white border-b border-gray-200">
        <button
          onClick={handleAddCurrentJob}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          + Save Current Job
        </button>
      </div>

      {/* Job List */}
      <div className="flex-1 overflow-y-auto p-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-2">💼</div>
            <p className="text-sm">No jobs saved yet</p>
            <p className="text-xs mt-1">Navigate to a job posting and click "Save Current Job"</p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteJob}
            />
          ))
        )}
      </div>
    </div>
  );
};
