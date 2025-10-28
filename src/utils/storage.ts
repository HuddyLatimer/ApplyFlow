export type JobStatus = 'saved' | 'applied' | 'interview' | 'rejected' | 'offer';

export interface Job {
  id: string;
  title: string;
  company: string;
  url: string;
  status: JobStatus;
  dateSaved: string;
  dateApplied?: string;
  notes?: string;
}

export interface StorageData {
  jobs: Job[];
}

const STORAGE_KEY = 'applyflow_jobs';

export const storage = {
  async getAllJobs(): Promise<Job[]> {
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      return result[STORAGE_KEY] || [];
    } catch (error) {
      console.error('Error getting jobs:', error);
      return [];
    }
  },

  async saveJob(job: Omit<Job, 'id' | 'dateSaved'>): Promise<Job> {
    try {
      const jobs = await this.getAllJobs();
      const newJob: Job = {
        ...job,
        id: Date.now().toString(),
        dateSaved: new Date().toISOString(),
      };

      // Check if job already exists by URL
      const existingJobIndex = jobs.findIndex(j => j.url === newJob.url);
      if (existingJobIndex !== -1) {
        // Update existing job
        jobs[existingJobIndex] = { ...jobs[existingJobIndex], ...newJob, id: jobs[existingJobIndex].id };
        await chrome.storage.local.set({ [STORAGE_KEY]: jobs });
        return jobs[existingJobIndex];
      }

      jobs.unshift(newJob);
      await chrome.storage.local.set({ [STORAGE_KEY]: jobs });
      return newJob;
    } catch (error) {
      console.error('Error saving job:', error);
      throw error;
    }
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<void> {
    try {
      const jobs = await this.getAllJobs();
      const index = jobs.findIndex(job => job.id === id);
      if (index !== -1) {
        jobs[index] = { ...jobs[index], ...updates };

        // If status is being changed to 'applied', set dateApplied
        if (updates.status === 'applied' && !jobs[index].dateApplied) {
          jobs[index].dateApplied = new Date().toISOString();
        }

        await chrome.storage.local.set({ [STORAGE_KEY]: jobs });
      }
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  async deleteJob(id: string): Promise<void> {
    try {
      const jobs = await this.getAllJobs();
      const filteredJobs = jobs.filter(job => job.id !== id);
      await chrome.storage.local.set({ [STORAGE_KEY]: filteredJobs });
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  async getStats() {
    const jobs = await this.getAllJobs();
    const total = jobs.length;
    const applied = jobs.filter(j => ['applied', 'interview', 'rejected', 'offer'].includes(j.status)).length;
    const interviews = jobs.filter(j => j.status === 'interview').length;
    const offers = jobs.filter(j => j.status === 'offer').length;
    const rejected = jobs.filter(j => j.status === 'rejected').length;

    // Response rate: (interviews + offers) / applied
    const responseRate = applied > 0 ? ((interviews + offers) / applied * 100).toFixed(1) : '0';

    return {
      total,
      applied,
      interviews,
      offers,
      rejected,
      responseRate: `${responseRate}%`,
    };
  },
};
