import { BlogPostData, NewsBlogsResponse } from '#/entity';
import apiClient from '../apiClient';

export enum BlogApi {
  Blogs = '/content/get-news-blogs',
  SaveBlog = '/content/upload-news-blog', // New API endpoint for saving blog
}

export interface FetchBlogParams {
  page?: number;
  page_size?: number;
  search?: string;
}

// Function to get the blog list
const getBlogList = (blogParams: FetchBlogParams | null) => {
  // Safely destructure properties from blogParams
  const { page, page_size: pageSize, search } = blogParams || {};

  // Build params dynamically, excluding undefined values
  const params: Record<string, any> = {}; // Use Record for better typing
  if (page !== undefined) params.page = page;
  if (pageSize !== undefined) params.page_size = pageSize;
  if (search) params.search = search;

  return apiClient.get<NewsBlogsResponse>({
    url: BlogApi.Blogs,
    params: params,
  });
};


// Function to save a blog post
const saveBlogPost = (data: BlogPostData) => {
  const formData = new FormData();
  formData.append('title', data.title);
  if (data.images) {
    formData.append('images', data.images);
  }
  formData.append('content', data.content);

  return apiClient.post<any>({
    url: BlogApi.SaveBlog,
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
