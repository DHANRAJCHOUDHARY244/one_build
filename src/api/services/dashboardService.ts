import apiClient from '../apiClient';

const enum DashApi {
  ApiEndpoints = '/admin/auth/dashboard',
}

const DashboardApi = async () => {
  return apiClient.get<any>({ url: DashApi.ApiEndpoints });
};

export default DashboardApi;
