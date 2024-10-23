import apiClient from '../apiClient';

// import { Blogs } from '#/entity';

export enum OrgApi {
  Org = '/org',
}

const getBlogList = () => apiClient.get<any[]>({ url: OrgApi.Org });

export default {
  getBlogList,
};
