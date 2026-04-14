import axios from 'axios';
import { ResumeData } from '@/types/resume';

// Backend API Configuration
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ParsedResume {
  personal_info: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
  ats_score: number;
}

export interface JobMatchScore {
  score: number;
  matched_skills: string[];
  missing_skills: string[];
  recommendations: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

export interface ResumeResponse {
  success: boolean;
  resume?: any;
  resumes?: any[];
  message?: string;
}

class ResumeApiService {
  private backendApi = axios.create({
    baseURL: BACKEND_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Set auth token for authenticated requests
  setAuthToken(token: string) {
    this.backendApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Authentication methods
  async register(email: string, password: string, name: string): Promise<ApiResponse<User>> {
    try {
      const response = await this.backendApi.post('/auth/register', {
        email,
        password,
        name,
      });

      if (response.data.success) {
        return {
          data: response.data.user,
          status: response.status,
        };
      } else {
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  }

  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.backendApi.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        // Set auth token for future requests
        this.setAuthToken(response.data.token);
        return {
          data: response.data,
          status: response.status,
        };
      } else {
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }

  // Resume CRUD operations
  async saveResume(resumeData: ResumeData, userId: string = 'demo-user'): Promise<ApiResponse<any>> {
    try {
      const response = await this.backendApi.post('/resumes', {
        userId,
        title: `Resume for ${resumeData.personalInfo.fullName || 'User'}`,
        data: resumeData,
        templateId: resumeData.templateId,
      });

      if (response.data.success) {
        return {
          data: response.data.resume,
          status: response.status,
        };
      } else {
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to save resume');
    }
  }

  async loadResumes(userId: string = 'demo-user'): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.backendApi.get(`/resumes/${userId}`);

      if (response.data.success) {
        return {
          data: response.data.resumes,
          status: response.status,
        };
      } else {
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to load resumes');
    }
  }

  async updateResume(id: string, resumeData: ResumeData): Promise<ApiResponse<any>> {
    try {
      const response = await this.backendApi.put(`/resumes/${id}`, {
        title: `Resume for ${resumeData.personalInfo.fullName || 'User'}`,
        data: resumeData,
        templateId: resumeData.templateId,
      });

      if (response.data.success) {
        return {
          data: response.data.resume,
          status: response.status,
        };
      } else {
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to update resume');
    }
  }

  async deleteResume(id: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.backendApi.delete(`/resumes/${id}`);

      if (response.data.success) {
        return {
          data: response.data,
          status: response.status,
        };
      } else {
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to delete resume');
    }
  }

  // File upload for parsing
  async uploadResumeFile(file: File): Promise<ApiResponse<any>> {
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await this.backendApi.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        return {
          data: response.data.file,
          status: response.status,
        };
      } else {
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to upload file');
    }
  }

  // Resume parsing (using ApyHub)
  async parseResume(file: File): Promise<ApiResponse<ParsedResume>> {
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await axios.post(`${BACKEND_API_BASE_URL}/parse-resume`, formData);

      return {
        data: response.data.data,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error parsing resume:', error);
      throw new Error(error.response?.data?.error || 'Failed to parse resume. Please check your backend and try again.');
    }
  }

  async parseResumeText(text: string): Promise<ApiResponse<ParsedResume>> {
    try {
      const response = await this.backendApi.post('/parse-resume', {
        content: text,
      });

      return {
        data: response.data.data,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error parsing resume text:', error);
      throw new Error(error.response?.data?.error || 'Failed to parse resume text. Please check your backend and try again.');
    }
  }

  // Job match scoring (using backend proxy)
  async calculateJobMatch(
    resumeContent: string,
    jobDescription: string
  ): Promise<ApiResponse<JobMatchScore>> {
    try {
      const response = await this.backendApi.post('/job-match', {
        resumeContent: resumeContent,
        jobDescription: jobDescription,
      });

      return {
        data: response.data.result,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error calculating job match:', error);
      throw new Error(error.response?.data?.error || 'Failed to calculate job match score. Please check your backend and try again.');
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    try {
      const response = await this.backendApi.get('/health');
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Backend server is not running');
    }
  }
}

export const resumeApi = new ResumeApiService();

// Utility function for testing API connection
export const testApiConnection = async () => {
  try {
    const response = await resumeApi.healthCheck();
    console.log('Backend API Connection Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Backend API Connection failed:', error);
    throw error;
  }
}