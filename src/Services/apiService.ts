import axios from 'axios';
import type { PredictionRequest, PredictionResponse } from './types';

const API_URL = 'https://api-student-depression.onrender.com'; 

const apiService = {
  async predict(data: PredictionRequest): Promise<PredictionResponse> {
    const response = await axios.post<PredictionResponse>(
      `${API_URL}/api/v1/predict`,
      data
    );
    return response.data;
  },
};

export default apiService;
