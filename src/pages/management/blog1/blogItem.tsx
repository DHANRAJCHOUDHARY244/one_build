import { LatestBlog } from "#/entity"; // Ensure this path is correct
import blogService, { FetchBlogParams } from "@/api/services/blogService";
import { Button, Card, Col, Form, Input, Pagination, Row } from "antd";
import { useEffect, useState } from "react";

function ArticleList() {
  const [blogs, setBlogs] = useState<LatestBlog[]>([]);
  const [searchForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchBlogs = async (params: FetchBlogParams = {}) => {
    try {
      const { latest_blog, paging, news_blogs } = await blogService.getBlogList(params);

      // Ensure latest_blog is a single LatestBlog object and news_blogs is an array
      const newBlogs: LatestBlog[] = [];

      // Add latest_blog to the array if it's not null and is an object
      if (latest_blog && typeof latest_blog === 'object') {
        newBlogs.push(latest_blog);
      }

      // Add news blogs to the array if they exist
      if (Array.isArray(news_blogs)) {
        newBlogs.push(...news_blogs);
      }

      // Set the state with the combined blogs
      setBlogs(newBlogs);
      setTotalRecords(paging.total);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const onSearch = async (values: { search?: string }) => {
    const params = {
      ...values,
      page: currentPage,
      page_size: pageSize,
    };
    if (!values.search) params.search = undefined;
    await fetchBlogs(params);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 10);
    fetchBlogs({
      page,
      page_size: pageSize,
      search: searchForm.getFieldValue('search'),
    });
  };

  const onReset = () => {
    searchForm.resetFields();
    fetchBlogs();
  };

  return (
    <Card>
      <Form form={searchForm} layout="vertical" onFinish={onSearch}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Name" name="search">
              <Input placeholder="Search by name (optional)" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label=" " colon={false}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button type="primary" htmlType="submit">Search</Button>
                <Button onClick={onReset}>Reset</Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="flex space-x-4">
              <img src={blog.media.media_path} alt="Article" className="h-32 w-32 rounded object-cover" />
              <div>
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                <div className="text-sm text-gray-600">
                  <span>{new Date(blog.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No blogs found.</div>
        )}
      </div>
      <Card>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalRecords}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </Card>
    </Card>
  );
}

export default ArticleList;
