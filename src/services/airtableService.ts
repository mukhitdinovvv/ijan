
import axios from 'axios';

// Create axios instance for our backend API
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Report bullying interface
export interface BullyingReport {
  schoolName: string;
  bullyingType: string;
  description: string;
  victimName?: string;
}

// Contact request interface
export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  contactPreference: string;
  consultationType: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
}

// Get all bullying reports
export const getBullyingReports = async () => {
  try {
    const response = await api.get('/bullying/reports');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении отчетов:', error);
    throw error;
  }
};

// Get a specific bullying report
export const getBullyingReport = async (id: string) => {
  try {
    const response = await api.get(`/bullying/report/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении отчета:', error);
    throw error;
  }
};

// Submit bullying report to our API
export const submitBullyingReport = async (report: BullyingReport) => {
  try {
    const response = await api.post('/bullying/report', {
      school_name: report.schoolName,
      bullying_type: report.bullyingType,
      description: report.description,
      victim_name: report.victimName || '',
      status: 'new',
      date_reported: new Date().toISOString().split('T')[0]
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке отчета:', error);
    throw error;
  }
};

// Submit contact request to our API
export const submitContactRequest = async (request: ContactRequest) => {
  try {
    const response = await api.post('/contact', {
      name: request.name,
      email: request.email,
      phone: request.phone || '',
      contact_preference: request.contactPreference,
      consultation_type: request.consultationType,
      message: request.message,
      preferred_date: request.preferredDate || '',
      preferred_time: request.preferredTime || ''
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке контактной формы:', error);
    throw error;
  }
};