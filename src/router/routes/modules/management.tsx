import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import UserPage from '@/pages/management/system/user';
import { AppRouteObject } from '#/router';

const Blog = lazy(() => import('@/pages/management/blog'));
const UserDetailsPage = lazy(() => import('@/pages/management/system/user/detail'));


const management: AppRouteObject = {
  order: 2,
  path: 'management',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.management',
    icon: <SvgIcon icon="ic-management" className="ant-menu-item-icon" size="24" />,
    key: '/management',
  },
  children: [
    {
      index: true,
      element: <Navigate to="create-new-user" replace />, // Redirecting to create new user as default
    },
    {
      path: 'create-new-user',  // Path for creating a new user
      element: <UserPage />,
      meta: { label: 'Create User', key: '/management/create-new-user' },
    },
    {
      path: 'user-details/:id',  // Path for creating a new user
      element: <UserDetailsPage />,
      meta: { label: 'User Details', key: '/management/user-details/:id',hideMenu: true,},
    },
    {
      path: 'create-blog',  // Path for creating a blog
      element: <Blog />,
      meta: { label: 'Create Blog', key: '/management/create-blog' },
    }
  ],
};

export default management;
