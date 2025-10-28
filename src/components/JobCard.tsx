import React from 'react';
import { Job, JobStatus } from '../utils/storage';

interface JobCardProps {
  job: Job;
  onUpdateStatus: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  saved: { emoji: '💼', label: 'Saved', color: 'bg-gray-100 text-gray-800' },
  applied: { emoji: '✅', label: 'Applied', color: 'bg-blue-100 text-blue-800' },
  interview: { emoji: '🗓️', label: 'Interview', color: 'bg-purple-100 text-purple-800' },
  rejected: { emoji: '❌', label: 'Rejected', color: 'bg-red-100 text-red-800' },
  offer: { emoji: '🎉', label: 'Offer', color: 'bg-green-100 text-green-800' },
};

export const JobCard: React.FC<JobCardProps> = ({ job, onUpdateStatus, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{job.title}</h3>
          <p className="text-gray-600 text-xs mb-2">{job.company}</p>
        </div>
        <button
          onClick={() => onDelete(job.id)}
          className="text-gray-400 hover:text-red-500 text-xs ml-2"
          title="Delete job"
        >
          🗑️
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig[job.status].color}`}>
          {statusConfig[job.status].emoji} {statusConfig[job.status].label}
        </span>
        <span className="text-xs text-gray-500">
          {formatDate(job.dateSaved)}
        </span>
      </div>

      <div className="flex gap-1 mb-2">
        {(Object.keys(statusConfig) as JobStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => onUpdateStatus(job.id, status)}
            className={`text-xs px-2 py-1 rounded border transition-colors ${
              job.status === status
                ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
            }`}
            title={`Mark as ${statusConfig[status].label}`}
          >
            {statusConfig[status].emoji}
          </button>
        ))}
      </div>

      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-primary-600 hover:text-primary-800 hover:underline block truncate"
      >
        View Job Posting →
      </a>
    </div>
  );
};
