import apiClient from '../api';
import { APP_ENDPOINTS } from './appApi';

// App Service Methods
export const appService = {
    getCompletionScore: () => apiClient.get(APP_ENDPOINTS.GET_COMPLETION_SCORE),
};

export default {
    ...appService,
};
