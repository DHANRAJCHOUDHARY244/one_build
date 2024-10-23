import { Suspense, lazy } from 'react';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const BlogPage = lazy(() => import(`@/pages/management/blog1`));

// Root level blog route
const blogRootRoute: AppRouteObject = {
  path: '/blog',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <BlogPage />
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.blog',
    icon: <SvgIcon icon="ic-blog" className="ant-menu-item-icon" size="24" />,
    key: '/blog',
  },
};

export default blogRootRoute;
