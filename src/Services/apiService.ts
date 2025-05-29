import axios from 'axios';
import type { PredictionRequest, PredictionResponse } from './types';

const API_URL = 'http://127.0.0.1:8000';

const apiService = {
  async predict(data: PredictionRequest): Promise<PredictionResponse> {
    const response = await axios.post<PredictionResponse>(
      `${API_URL}/predict`,
      data
    );
    return response.data;
  },
};

export default apiService;
