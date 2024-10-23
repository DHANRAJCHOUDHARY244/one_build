import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const ProfilePage = lazy(() => import('@/pages/management/user/profile'));
const AccountPage = lazy(() => import('@/pages/management/user/account'));

const userInfoRoutes: AppRouteObject = {
  order: 5,
  path: 'admin-info',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'Admin Info',
    icon: <SvgIcon icon="ic-admin" className="ant-menu-item-icon" size="24" />,
    key: '/admin-info',
  },
  children: [
    {
      index: true,
      element: <Navigate to="profile" replace />,
    },
    {
      path: 'profile',
      element: <ProfilePage />,
      meta: { label: 'sys.menu.user.profile', key: '/admin-info/profile' },
    },
    {
      path: 'account',
      element: <AccountPage />,
      meta: { label: 'sys.menu.user.account', key: '/admin-info/account' },
    },
  ],
};

export default userInfoRoutes;
