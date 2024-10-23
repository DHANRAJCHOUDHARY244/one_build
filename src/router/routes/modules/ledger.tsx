import { Suspense, lazy } from 'react';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const LedgerPage = lazy(() => import(`@/pages/ledger`));

// Root level ledger route
const ledgerRootRoute: AppRouteObject = {
  path: '/ledger',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <LedgerPage />
    </Suspense>
  ),
  meta: {
    label: 'Ledger',
    icon: <SvgIcon icon="ic-ledger" className="ant-menu-item-icon" size="24" />,
    key: '/ledger',
  },
};

export default ledgerRootRoute;
