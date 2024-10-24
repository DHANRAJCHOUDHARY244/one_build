import { BlogPostData } from '#/entity';
import apiClient from '../apiClient';

export enum OrgApi {
  Org = '/org',
  SaveBlog = '/content/upload-news-blog', // New API endpoint for saving blog
}

// Function to get the blog list
const getBlogList = () => apiClient.get<any[]>({ url: OrgApi.Org });

// Function to save a blog post
const saveBlogPost = (data: BlogPostData) => {
  const formData = new FormData();
  formData.append('title', data.title); 
  if (data.images) {
    formData.append('images', data.images);
  }
  formData.append('content', data.content);
  
  return apiClient.post<any>({
    url: OrgApi.SaveBlog,
    data: formData, 
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
};

export default {
  getBlogList,
  saveBlogPost, 
};
